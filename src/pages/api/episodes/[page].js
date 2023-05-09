import { parse } from 'rss-to-json';

import { truncate } from '@/utils/truncate';

function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export async function fetchEpisodes(page = 1) {
  const feed = await parse('https://feeds.megaphone.fm/PODRYL5396410253');

  const allEpisodes = feed.items
    .filter((item) => item.itunes_episodeType !== 'trailer')
    .map(
      ({ id, title, description, enclosures, published, itunes_episode }) => {
        return {
          id,
          title: `${title}`,
          published,
          description: truncate(description, 275),
          episodeNumber: itunes_episode,
          audio: enclosures.map((enclosure) => ({
            src: enclosure.url,
            type: enclosure.type,
          }))[0],
        };
      }
    );

  return paginate(allEpisodes, 15, page);
}

export default async function handler(req, res) {
  const { page } = req.query;

  const episodes = await fetchEpisodes(page);

  return res.status(200).send(episodes);
}
