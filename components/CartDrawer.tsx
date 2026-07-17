// components/CartDrawer.tsx
'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartItemCount,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      {/* Styled using strict background and border variables */}
      <SheetContent 
        side="right" 
        className="bg-background border-l border-border text-foreground flex flex-col justify-between w-full sm:max-w-md overflow-hidden p-0 transition-colors duration-300"
      >
        
        {/* Header Block */}
        <div className="p-6 border-b border-border bg-background">
          <SheetTitle className="text-yellow-600 dark:text-yellow-400 flex items-center gap-2 font-serif font-bold">
            <ShoppingBag className="w-5 h-5" />
            Your Shopping Cart ({getCartItemCount()})
          </SheetTitle>
        </div>

        {/* Scrollable Container (Items + Form) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-accent/10">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
              <ShoppingBag className="w-12 h-12 stroke-1" />
              <p className="text-sm">Your shopping cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product list */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b border-border pb-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted border border-border flex-shrink-0">
                      <Image
                        src={item.product.images[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&auto=format&fit=crop&q=80'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 font-bold mt-1">{item.product.price}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-border rounded-md bg-background">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-2 font-medium text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Delete trigger */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          )}
        </div>

        {/* Sticky Symmetrical Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-background">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Estimated Subtotal</span>
              <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">Rs. {getCartSubtotal().toLocaleString('en-US')}</span>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-md font-semibold flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Fill your details and proceed with payment verification
            </p>
          </div>
        )}

        {/* Checkout Modal */}
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
