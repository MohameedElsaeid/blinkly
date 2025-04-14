export const getOptimizedImageUrl = (url: string, width: number, quality: number = 80): string => {
  // Check if URL is from our CDN
  if (url.startsWith('https://images.blinkly.app')) {
    return `${url}?w=${width}&q=${quality}&auto=format`;
  }
  
  // For external images, proxy through our image optimization service
  return `https://images.blinkly.app/proxy?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`;
};

export const generateSrcSet = (url: string, sizes: number[] = [320, 640, 768, 1024, 1280]): string => {
  return sizes
    .map(size => `${getOptimizedImageUrl(url, size)} ${size}w`)
    .join(', ');
};

export const getImageDimensions = async (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = url;
  });
};