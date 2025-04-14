
export const getOptimizedImageUrl = (url: string, width: number, quality: number = 80): string => {
  // If URL is empty or invalid, return a placeholder
  if (!url || typeof url !== 'string') {
    return `https://placehold.co/${width}x${Math.floor(width/1.5)}/f0f0f0/cccccc?text=Image+Unavailable`;
  }
  
  // Handle already optimized URLs from external services
  if (url.startsWith('https://images.unsplash.com/') || 
      url.startsWith('https://placehold.co/') ||
      url.startsWith('https://placeholder.com/')) {
    return url;
  }
  
  // Check if URL is from our CDN
  if (url.startsWith('https://images.blinkly.app')) {
    return `${url}?w=${width}&q=${quality}&auto=format`;
  }
  
  // For external images, proxy through our image optimization service
  // If URL has a query parameter, handle it properly
  const encodedUrl = encodeURIComponent(url);
  return `https://images.blinkly.app/proxy?url=${encodedUrl}&w=${width}&q=${quality}`;
};

export const generateSrcSet = (url: string, sizes: number[] = [320, 640, 768, 1024, 1280]): string => {
  // Check if URL is valid
  if (!url || typeof url !== 'string') {
    return '';
  }
  
  return sizes
    .map(size => `${getOptimizedImageUrl(url, size)} ${size}w`)
    .join(', ');
};

export const getImageDimensions = async (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (!url || typeof url !== 'string') {
      reject(new Error('Invalid image URL'));
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

// Helper function to get aspect ratio from image
export const getAspectRatio = async (url: string): Promise<number> => {
  try {
    const { width, height } = await getImageDimensions(url);
    return width / height;
  } catch (error) {
    console.error('Error getting aspect ratio:', error);
    return 16/9; // Default aspect ratio
  }
};

// Function to check if an image URL is valid
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsedUrl = new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
