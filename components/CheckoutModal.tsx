'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from './CartProvider';
import { Loader2, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, getCartSubtotal, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState({
    customerName: '',
    fatherName: '',
    contactNumber: '',
    address: '',
    notes: '',
  });

  const [orderData, setOrderData] = useState<any>(null);

  const subtotal = getCartSubtotal();
  const shippingFee = subtotal > 0 ? (subtotal > 5000 ? 0 : 500) : 0;
  const total = subtotal + shippingFee;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      setError('Customer name is required');
      return false;
    }
    if (!formData.fatherName.trim()) {
      setError('Father name is required');
      return false;
    }
    if (!formData.contactNumber.trim() || formData.contactNumber.length < 10) {
      setError('Valid contact number is required');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStep('payment');
    setOrderData({
      customerName: formData.customerName,
      fatherName: formData.fatherName,
      contactNumber: formData.contactNumber,
      address: formData.address,
      notes: formData.notes,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Convert to base64 for demo (in production, upload to cloud storage)
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFileUrl(reader.result as string);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitOrder = async () => {
    if (!uploadedFileUrl) {
      setError('Payment proof screenshot is required');
      return;
    }

    if (!orderData) return;

    setIsSubmitting(true);
    setError('');

    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: orderData.customerName,
          fatherName: orderData.fatherName,
          contactNumber: orderData.contactNumber,
          address: orderData.address,
          items: orderItems,
          subtotal,
          shippingFee,
          total,
          paymentProofUrl: uploadedFileUrl,
          notes: orderData.notes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create order');
      }

      setOrderData(result);
      clearCart();
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      setStep('form');
      setFormData({
        customerName: '',
        fatherName: '',
        contactNumber: '',
        address: '',
        notes: '',
      });
      setUploadedFileUrl('');
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Order Details</DialogTitle>
              <DialogDescription>Please provide your information to complete the order</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Order Summary */}
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="text-foreground font-medium">
                        Rs. {(parseFloat(item.product.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-3 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Rs. {shippingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-yellow-600 dark:text-yellow-400">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Customer Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-yellow-600 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-foreground block mb-2">Father Name *</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-yellow-600 focus:outline-none"
                      placeholder="Enter your father name"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-yellow-600 focus:outline-none"
                    placeholder="+92 300 1234567"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-2">Delivery Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-yellow-600 focus:outline-none resize-none"
                    placeholder="House no, Street name, City, Area, Postal Code"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground block mb-2">Delivery Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows={2}
                    className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-yellow-600 focus:outline-none resize-none"
                    placeholder="E.g., Leave at gate, Call before delivery, etc."
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white h-11 font-semibold">
                Proceed to Payment
              </Button>
            </form>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Payment Proof</DialogTitle>
              <DialogDescription>Upload a screenshot of your payment confirmation</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Order Total</h3>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  Rs. {total.toLocaleString()}
                </p>
              </div>

              {/* File Upload */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground block">Payment Proof Screenshot *</label>

                {uploadedFileUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-background">
                    <Image src={uploadedFileUrl} alt="Payment proof" fill className="object-contain p-2" />
                    <label className="absolute top-2 right-2 bg-primary hover:bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium cursor-pointer">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload payment screenshot</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">Payment Instructions:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc pl-5">
                  <li>Transfer the total amount to our bank account or mobile wallet</li>
                  <li>Take a screenshot of the successful transaction</li>
                  <li>Upload the screenshot as proof of payment</li>
                </ul>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('form')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting || !uploadedFileUrl}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Order'
                  )}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Order Placed Successfully
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-foreground">
                Thank you for your order! Our admin team will review your payment and order details shortly.
              </p>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2">Order Number:</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-300">{orderData?.orderNumber}</p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• We will confirm your order within 24 hours</p>
                <p>• A confirmation message will be sent to your contact number</p>
                <p>• Your delivery will be processed based on availability</p>
              </div>

              <Button onClick={handleClose} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white h-11 font-semibold">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
