import { Product } from '../contexts/AppContext';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 25,
    sellerId: 'seller1',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    price: 399.99,
    description: 'Advanced smartwatch with health monitoring, GPS, and seamless smartphone integration.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 15,
    sellerId: 'seller1',
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Designer Sneakers',
    price: 159.99,
    description: 'Comfortable and stylish sneakers perfect for everyday wear. Made with premium materials.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    category: 'Fashion',
    stock: 30,
    sellerId: 'seller2',
    rating: 4.5,
    reviews: 67,
  },
  {
    id: '4',
    name: 'Vintage Leather Jacket',
    price: 249.99,
    description: 'Classic leather jacket with vintage styling. Genuine leather construction for durability and style.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Fashion',
    stock: 12,
    sellerId: 'seller2',
    rating: 4.7,
    reviews: 45,
  },
  {
    id: '5',
    name: 'Modern Coffee Maker',
    price: 179.99,
    description: 'Sleek and efficient coffee maker with programmable settings and thermal carafe.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    category: 'Home & Kitchen',
    stock: 20,
    sellerId: 'seller3',
    rating: 4.4,
    reviews: 78,
  },
  {
    id: '6',
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    description: 'Contemporary desk lamp with adjustable brightness and sleek design.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    category: 'Home & Kitchen',
    stock: 35,
    sellerId: 'seller3',
    rating: 4.3,
    reviews: 92,
  },
  {
    id: '7',
    name: 'Professional Camera',
    price: 899.99,
    description: 'High-resolution digital camera with advanced features for photography enthusiasts.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
    category: 'Electronics',
    stock: 8,
    sellerId: 'seller1',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '8',
    name: 'Cozy Throw Blanket',
    price: 49.99,
    description: 'Soft and warm throw blanket perfect for relaxing at home. Made from premium materials.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    category: 'Home & Kitchen',
    stock: 50,
    sellerId: 'seller3',
    rating: 4.6,
    reviews: 113,
  },
];

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Beauty',
];

// Mock API functions
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockProducts;
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts.find(product => product.id === id) || null;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (category === 'All') return mockProducts;
  return mockProducts.filter(product => product.category === category);
};