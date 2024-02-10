import { getAllEpisodes } from '@/lib/episodes';

function paginate(array, pageSize, pageNumber) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export async function fetchEpisodes(page = 1) {
  const episodesPerPage = 15;

  const allEpisodes = await getAllEpisodes();

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
