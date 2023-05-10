export default async function handler(req, res) {
  await fetch(
    'https://api.vercel.com/v1/integrations/deploy/prj_i6vPiRUGzJOS2iUfK75LQQ69DdXL/t9DBDHukj8'
  );

  res.status(200).end('Rebuilding for new episodes');
}
