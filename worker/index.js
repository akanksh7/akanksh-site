// GitHub OAuth proxy for Decap. Secrets (never in the repo): CLIENT_ID, CLIENT_SECRET. Var: ALLOWED_USER.
const cookie = (n, v, age) => `${n}=${v}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${age}`;
const page = (msg, data) => new Response(`<!doctype html><script>
(function(){function r(e){window.opener.postMessage("authorization:github:${msg}:"+${JSON.stringify(JSON.stringify(data))},e.origin)}
window.addEventListener("message",r,false);window.opener.postMessage("authorizing:github","*")})()</script>`,
  { headers: { 'content-type': 'text/html', 'Set-Cookie': cookie('s', '', 0) } });
export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (u.pathname === '/auth') {
      const s = crypto.randomUUID();
      return new Response(null, { status: 302, headers: {
        Location: `https://github.com/login/oauth/authorize?client_id=${env.CLIENT_ID}&scope=public_repo&state=${s}`,
        'Set-Cookie': cookie('s', s, 600) } });
    }
    if (u.pathname === '/callback') {
      const ok = (req.headers.get('cookie') || '').includes(`s=${u.searchParams.get('state')}`) && u.searchParams.get('state');
      if (!ok) return new Response('Bad state', { status: 400 });
      const t = await (await fetch('https://github.com/login/oauth/access_token', { method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ client_id: env.CLIENT_ID, client_secret: env.CLIENT_SECRET, code: u.searchParams.get('code') }) })).json();
      if (!t.access_token) return page('error', { error: 'token exchange failed' });
      const me = await (await fetch('https://api.github.com/user', { headers: { authorization: `Bearer ${t.access_token}`, 'user-agent': 'decap-proxy' } })).json();
      if (!me.login || me.login.toLowerCase() !== env.ALLOWED_USER.toLowerCase()) return new Response('Forbidden', { status: 403 });
      return page('success', { token: t.access_token, provider: 'github' });
    }
    return new Response('Not found', { status: 404 });
  }
};
