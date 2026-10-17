interface R2MediaObject {
  body?: ReadableStream;
  size: number;
  httpEtag: string;
  httpMetadata?: {
    contentType?: string;
    cacheControl?: string;
  };
  range?: {
    offset?: number;
    length?: number;
  };
  writeHttpMetadata?(headers: Headers): void;
}

interface R2MediaBucket {
  get(key: string, options?: { range?: Headers }): Promise<R2MediaObject | null>;
  head(key: string): Promise<R2MediaObject | null>;
}

interface Env {
  R2_BUCKET: R2MediaBucket;
}

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
};

function contentTypeFor(key: string): string {
  const extension = key.slice(key.lastIndexOf('.')).toLowerCase();
  return CONTENT_TYPES[extension] ?? 'application/octet-stream';
}

function getObjectKey(pathname: string): string | null {
  try {
    const key = decodeURIComponent(pathname.slice('/media/'.length));
    const allowedPrefix = key.startsWith('images/') || key.startsWith('videos/');

    if (!allowedPrefix || key.split('/').some((part) => part === '.' || part === '..' || !part)) {
      return null;
    }

    return key;
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (!url.pathname.startsWith('/media/')) {
      return new Response('Not found', { status: 404 });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      });
    }

    const key = getObjectKey(url.pathname);
    if (!key) return new Response('Not found', { status: 404 });

    const rangeHeader = request.headers.get('Range');
    const object = request.method === 'HEAD'
      ? await env.R2_BUCKET.head(key)
      : await env.R2_BUCKET.get(
          key,
          rangeHeader ? { range: request.headers } : undefined,
        );

    if (!object) return new Response('Not found', { status: 404 });

    const headers = new Headers({
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Type': contentTypeFor(key),
      ETag: object.httpEtag,
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
    });
    object.writeHttpMetadata?.(headers);
    // R2 upload metadata is not always populated consistently; the extension
    // is authoritative for these known public media keys, especially MP4s.
    const extension = key.slice(key.lastIndexOf('.')).toLowerCase();
    headers.set(
      'Content-Type',
      CONTENT_TYPES[extension] ?? object.httpMetadata?.contentType ?? 'application/octet-stream',
    );
    headers.set('ETag', object.httpEtag);

    if (object.range) {
      const offset = object.range.offset ?? 0;
      const length = object.range.length ?? object.size;
      headers.set('Content-Length', String(length));
      headers.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${object.size}`);
      return new Response(object.body ?? null, { status: 206, headers });
    }

    headers.set('Content-Length', String(object.size));
    return new Response(request.method === 'HEAD' ? null : object.body ?? null, { headers });
  },
};
