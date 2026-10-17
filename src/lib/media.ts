const configuredMediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL?.trim();
const mediaBaseUrl = (configuredMediaBaseUrl || '/media').replace(/\/+$/, '');

/** Build a media URL from an R2 object key, served by the Cloudflare Worker. */
export function mediaUrl(key: string): string {
  const normalizedKey = key.replace(/^\/+/, '');

  return `${mediaBaseUrl}/${normalizedKey}`;
}
