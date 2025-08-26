import React from 'react';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useApp } from '../contexts/AppContext';

const OrderHistory: React.FC = () => {
  const { state } = useApp();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'secondary';
      case 'shipped':
        return 'default';
      case 'delivered':
        return 'success';
      default:
        return 'secondary';
    }
  };

  if (!state.user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
        <Button onClick={() => window.location.href = '/login'}>Sign In</Button>
      </div>
    );
  }

  if (state.orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Package className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
        <p className="text-muted-foreground mb-8">
          When you place orders, they will appear here.
        </p>
        <Button onClick={() => window.location.href = '/'} size="lg">
          Start Shopping
        </Button>
      </div>
    );
  }

  // Sort orders by date (newest first)
  const sortedOrders = [...state.orders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      <div className="space-y-6">
        {sortedOrders.map((order) => (
          <Card key={order.id} className="shadow-soft">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={getStatusColor(order.status) as any}
                    className="mb-2"
                  >
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </Badge>
                  <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                    )}
                    {(order.status === 'pending' || order.status === 'confirmed') && (
                      <Button variant="outline" size="sm" className="text-destructive">
                        Cancel Order
                      </Button>
                    )}
                    {order.status === 'shipped' && (
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    )}
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                    <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;