import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useApp } from '../contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock authentication
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: email.includes('seller') ? 'seller' as const : 'buyer' as const,
      };

      dispatch({ type: 'SET_USER', payload: mockUser });
      
      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${mockUser.role}.`,
      });

      navigate('/');
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: 'buyer' | 'seller') => {
    const mockUser = {
      id: role === 'buyer' ? '1' : '2',
      name: role === 'buyer' ? 'Demo Buyer' : 'Demo Seller',
      email: `demo@${role}.com`,
      role,
    };

    dispatch({ type: 'SET_USER', payload: mockUser });
    
    toast({
      title: "Demo Login",
      description: `Logged in as demo ${role}.`,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 gradient-hero">
      <Card className="w-full max-w-md shadow-strong">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Store className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue shopping
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Demo Login Buttons */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Try the demo:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('buyer')}
                className="text-xs"
              >
                Demo Buyer
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('seller')}
                className="text-xs"
              >
                Demo Seller
              </Button>
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full transition-bounce hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;