import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden transition-smooth hover:shadow-medium hover:-translate-y-1 cursor-pointer">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>
          
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-smooth">
            {product.name}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant={product.stock > 0 ? "secondary" : "destructive"} className="text-xs">
              {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full transition-bounce hover:scale-105"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;