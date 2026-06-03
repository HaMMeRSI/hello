import type { ProjectMedia, ProjectMediaAsset } from '../content/profile/projects';

export function getAssetUrl(asset: ProjectMediaAsset | undefined) {
  if (!asset) return undefined;
  return typeof asset === 'string' ? asset : asset.src;
}

export function getOrderedMedia(media: ProjectMedia[] = []) {
  return [...media].sort((a, b) => Number(a.type === 'video') - Number(b.type === 'video'));
}

function getYouTubeVideoId(url: URL, hostname: string) {
  const [firstPathSegment, secondPathSegment] = url.pathname.split('/').filter(Boolean);

  if (hostname === 'youtu.be') return firstPathSegment;
  if (firstPathSegment === 'embed' || firstPathSegment === 'shorts') return secondPathSegment;

  return url.searchParams.get('v');
}

export function getYouTubeEmbedUrl(src: ProjectMediaAsset | undefined) {
  const mediaSrc = getAssetUrl(src);
  if (!mediaSrc) return null;

  try {
    const url = new URL(mediaSrc);
    const hostname = url.hostname.replace(/^www\./, '');
    const isYouTube = hostname === 'youtube.com' || hostname === 'youtu.be';
    if (!isYouTube) return null;

    const id = getYouTubeVideoId(url, hostname);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
