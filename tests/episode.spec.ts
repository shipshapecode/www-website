import { expect, test } from '@playwright/test';

const episode = {
  title:
    'Throwback Frameworks, Tailwind Fandom, and CSS with Jhey Tompkins - Whiskey Web and Whatnot - Episode 120',
  description:
    /^Have you ever reflected on the tools that shaped your journey as a developer\? Jhey Tompkins, Senior DX Engineer at Vercel, takes a trip down memory lane with Chuck and Robbie, even diving into the topic of Tailwind/,
  image:
    'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/38011720/38011720-1701997934575-fecf6a7bb5123.jpg',
};

test('works with episode numbers', async ({ page }) => {
  await page.goto('/120');

  await expect(page).toHaveTitle(episode.title);

  const ogTitle = page.locator('meta[name="og:title"]');
  await expect(ogTitle).toHaveAttribute('content', episode.title);

  const twitterTitle = page.locator('meta[name="twitter:title"]');
  await expect(twitterTitle).toHaveAttribute('content', episode.title);

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute('content', episode.description);

  const ogImage = page.locator('meta[name="og:image"]');
  await expect(ogImage).toHaveAttribute('content', episode.image);

  const twitterImage = page.locator('meta[name="twitter:image:src"]');
  await expect(twitterImage).toHaveAttribute('content', episode.image);
});

test('works with episode slugs', async ({ page }) => {
  await page.goto(
    '/throwback-frameworks-tailwind-fandom-and-css-with-jhey-tompkins',
  );

  await expect(page).toHaveTitle(episode.title);

  const ogTitle = page.locator('meta[name="og:title"]');
  await expect(ogTitle).toHaveAttribute('content', episode.title);

  const twitterTitle = page.locator('meta[name="twitter:title"]');
  await expect(twitterTitle).toHaveAttribute('content', episode.title);

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute('content', episode.description);

  const ogImage = page.locator('meta[name="og:image"]');
  await expect(ogImage).toHaveAttribute('content', episode.image);

  const twitterImage = page.locator('meta[name="twitter:image:src"]');
  await expect(twitterImage).toHaveAttribute('content', episode.image);
});
