// components/CartDrawer.tsx
'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageCircle, Trash2, Plus, Minus, ShoppingBag, User, MapPin, MessageSquare } from 'lucide-react';
import Image from 'next/image';

const WHATSAPP_NUMBER = "923194405935"; // Your WhatsApp number

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

  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [showValidationWarning, setShowValidationWarning] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (!customerName.trim() || !deliveryAddress.trim()) {
      setShowValidationWarning(true);
      return;
    }

    setShowValidationWarning(false);

    let messageText = `Hello 48hoursplus! I'd like to place an order:\n\n🛒 *ORDER DETAILS*:\n`;
    
    cart.forEach((item, index) => {
      messageText += `${index + 1}. *${item.product.name}*\n`;
      messageText += `   - Quantity: ${item.quantity}\n`;
      messageText += `   - Price: ${item.product.price} each\n`;
    });

    messageText += `\n--------------------------------\n`;
    messageText += `💵 *Subtotal*: Rs. ${getCartSubtotal().toLocaleString('en-US')}\n`;
    messageText += `🚚 *Delivery*: Calculated upon address validation\n\n`;
    
    messageText += `📋 *CUSTOMER INFO*:\n`;
    messageText += `👤 *Name*: ${customerName.trim()}\n`;
    messageText += `📍 *Address*: ${deliveryAddress.trim()}\n`;
    
    if (customNotes.trim()) {
      messageText += `💬 *Notes/Regards*: ${customNotes.trim()}\n`;
    }

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
  };

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

              {/* CUSTOMER INFORMATION FORM */}
              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider flex items-center gap-2 font-serif">
                  <MapPin className="w-4 h-4" />
                  Delivery Information
                </h3>

                {/* 1. Customer Name */}
                <div className="space-y-1">
                  <label htmlFor="customerName" className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5" />
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded bg-background border border-input px-3 py-2 text-sm text-foreground focus:border-yellow-500 focus:outline-none placeholder-muted-foreground/60"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* 2. Complete Address */}
                <div className="space-y-1">
                  <label htmlFor="deliveryAddress" className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    Complete Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="deliveryAddress"
                    required
                    rows={3}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full rounded bg-background border border-input px-3 py-2 text-sm text-foreground focus:border-yellow-500 focus:outline-none placeholder-muted-foreground/60 resize-none"
                    placeholder="Enter house no, street name, city, area details"
                  />
                </div>

                {/* 3. Regards */}
                <div className="space-y-1">
                  <label htmlFor="customNotes" className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Regards / Delivery Instructions <span className="text-muted-foreground/60">(Optional)</span>
                  </label>
                  <textarea
                    id="customNotes"
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full rounded bg-background border border-input px-3 py-2 text-sm text-foreground focus:border-yellow-500 focus:outline-none placeholder-muted-foreground/60 resize-none"
                    placeholder="Special instructions (e.g. leave at gate, call first)"
                  />
                </div>

                {/* Validation Warnings */}
                {showValidationWarning && (!customerName.trim() || !deliveryAddress.trim()) && (
                  <div className="p-3 text-xs rounded bg-destructive/10 border border-destructive/20 text-destructive text-center animate-pulse">
                    Please provide your name and complete delivery address.
                  </div>
                )}
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-md font-semibold flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
              onClick={handleCheckout}
            >
              <MessageCircle className="w-5 h-5" />
              Checkout via WhatsApp
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              All details will be pre-filled inside WhatsApp before sending.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}