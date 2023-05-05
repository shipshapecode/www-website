import Cors from 'cors';

const headers = new Headers({
  Authorization: 'Token token="5596a4249c004ae62d6ba7d56b02465c"',
  'Content-Type': 'application/json',
});

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  headers,
});

const requestOptions = {
  method: 'GET',
  headers,
  cache: 'no-cache',
};

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export async function fetchEpisodes(page = 1) {
  const response = await fetch(
    `https://cms.megaphone.fm/api/networks/a093ccf8-8107-11ea-a979-6ba9a9362965/podcasts/4516d296-4d41-11ec-a488-cfb25d03873a/episodes?page=${page}&per_page=12`,
    requestOptions
  );
  const episodes = await response.json();
  const formattedEpisodes = episodes.map(
    ({ id, title, summary, audioFile, createdAt }) => ({
      id,
      title: `${title}`,
      published: createdAt,
      description: summary,
      audio: {
        src: audioFile,
        type: 'audio/mpeg',
      },
    })
  );

  return formattedEpisodes;
}

export default async function handler(req, res) {
  const { page } = req.query;

  await runMiddleware(req, res, cors);

  const episodes = await fetchEpisodes(page);

  return res.status(200).send(episodes);
}
