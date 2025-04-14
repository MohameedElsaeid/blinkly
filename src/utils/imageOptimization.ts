
export const getOptimizedImageUrl = (url: string, width: number, quality: number = 80): string => {
  // If URL is empty or invalid, return a placeholder
  if (!url || typeof url !== 'string') {
    return `https://placehold.co/${width}x${Math.floor(width/1.5)}/f0f0f0/cccccc?text=Image+Unavailable`;
  }
  
  // Simple URL validation
  try {
    new URL(url);
  } catch (e) {
    console.error('Invalid URL:', url, e);
    return `https://placehold.co/${width}x${Math.floor(width/1.5)}/f0f0f0/cccccc?text=Invalid+URL`;
  }

  // Handle already optimized URLs from external services
  if (url.includes('unsplash.com') || 
      url.includes('placehold.co') ||
      url.includes('placeholder.com')) {
    // Ensure unsplash URLs have size parameters
    if (url.includes('unsplash.com') && !url.includes('?')) {
      return `${url}?w=${width}&q=${quality}&auto=format`;
    }
    return url;
  }
  
  // Check if URL is from our CDN
  if (url.includes('images.blinkly.app')) {
    return `${url}?w=${width}&q=${quality}&auto=format`;
  }
  
  // Pass through direct image URLs or base64 data
  if (url.startsWith('data:image/')) {
    return url;
  }
  
  // For external images, proxy through our image optimization service
  const encodedUrl = encodeURIComponent(url);
  return `https://images.blinkly.app/proxy?url=${encodedUrl}&w=${width}&q=${quality}`;
};

export const generateSrcSet = (url: string, sizes: number[] = [320, 640, 768, 1024, 1280]): string => {
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
    
    // Set a timeout to prevent hanging
    setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 10000);
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
  
  // Check for base64 encoded images
  if (url.startsWith('data:image/')) {
    return true;
  }
  
  try {
    const parsedUrl = new URL(url);
    return true;
  } catch (error) {
    console.error('Invalid URL format:', url);
    return false;
  }
};

// Helper to create fallback image URLs
export const getFallbackImageUrl = (width: number = 400, height: number = 300): string => {
  return `https://placehold.co/${width}x${height}/f0f0f0/cccccc?text=Image+Unavailable`;
};

// Convert relative URLs to absolute
export const resolveImageUrl = (url: string, baseUrl: string = window.location.origin): string => {
  if (!url) return '';
  
  // Already absolute or data URL
  if (url.startsWith('http') || url.startsWith('data:')) {
    return url;
  }
  
  // Handle relative paths
  try {
    return new URL(url, baseUrl).href;
  } catch (e) {
    console.error('Failed to resolve image URL:', url, e);
    return url;
  }
};
