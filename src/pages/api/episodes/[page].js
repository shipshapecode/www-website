import { parse } from 'rss-to-json';

import { truncate } from '@/utils/truncate';

function paginate(array, pageSize, pageNumber) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export async function fetchEpisodes(page = 1) {
  const episodesPerPage = 15;
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

  const canLoadMore = page * episodesPerPage < allEpisodes.length;

  return {
    canLoadMore,
    episodes: paginate(allEpisodes, episodesPerPage, page),
  };
}

export default async function handler(req, res) {
  const { page } = req.query;

  const episodes = await fetchEpisodes(page);

  return res.status(200).send(episodes);
}
