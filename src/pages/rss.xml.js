import rss from '@astrojs/rss'; import { getCollection } from 'astro:content'; import { site } from '../config';
export async function GET(c){const w=(await getCollection('writing',e=>!e.data.draft)).sort((a,b)=>b.data.date-a.data.date);
return rss({title:site.name,description:site.bio,site:c.site,items:w.map(e=>({title:e.data.title,description:e.data.summary,pubDate:e.data.date,link:`${site.base}/writing/${e.id}/`}))})}
