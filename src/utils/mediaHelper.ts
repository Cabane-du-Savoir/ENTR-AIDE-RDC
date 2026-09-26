export interface VideoEmbedInfo {
  type: 'youtube' | 'vimeo' | 'direct';
  embedUrl: string;
  originalUrl: string;
}

export function parseVideoUrl(url: string): VideoEmbedInfo {
  if (!url) {
    return { type: 'direct', embedUrl: '', originalUrl: '' };
  }

  const trimmed = url.trim();

  // YouTube match: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`,
      originalUrl: trimmed,
    };
  }

  // Vimeo match: vimeo.com/ID
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      originalUrl: trimmed,
    };
  }

  // Direct video file (mp4, webm, blob, data URL, etc.)
  return {
    type: 'direct',
    embedUrl: trimmed,
    originalUrl: trimmed,
  };
}
