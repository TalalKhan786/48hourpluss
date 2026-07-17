'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onStatusChange: (orderId: string, status: string, notes?: string) => Promise<void>;
}

export default function OrderDetailModal({ isOpen, onClose, order, onStatusChange }: OrderDetailModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState(order?.adminNotes || '');
  const [showNotesInput, setShowNotesInput] = useState(false);

  const statusFlow = ['pending', 'confirmed', 'shipped', 'delivered'];
  const currentStatusIndex = statusFlow.indexOf(order?.status);
  const nextStatus = currentStatusIndex < statusFlow.length - 1 ? statusFlow[currentStatusIndex + 1] : null;

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      await onStatusChange(order.id, newStatus, adminNotes);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-3">
            Order #{order.orderNumber}
            <Badge className={getStatusBadgeColor(order.status)} variant="outline">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Order placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
            {new Date(order.createdAt).toLocaleTimeString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="text-sm font-medium text-foreground">{order.customerName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Father Name</p>
                <p className="text-sm font-medium text-foreground">{order.fatherName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contact Number</p>
                <p className="text-sm font-medium text-foreground">{order.contactNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Delivery Address</p>
                <p className="text-sm font-medium text-foreground line-clamp-2">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center border-b border-border pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Rs. {item.subtotal.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping Fee</span>
                <span className="text-foreground">Rs. {order.shippingFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-base font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-yellow-600 dark:text-yellow-400">Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Proof */}
          {order.paymentProofUrl && (
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Payment Proof</h3>
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border bg-background">
                <Image
                  src={order.paymentProofUrl}
                  alt="Payment proof"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          )}

          {/* Delivery Notes */}
          {order.notes && (
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">Delivery Notes</h3>
              <p className="text-sm text-foreground">{order.notes}</p>
            </div>
          )}

          {/* Admin Notes */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-3">Admin Notes</h3>
            {showNotesInput ? (
              <div className="space-y-2">
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-2 rounded bg-background text-foreground text-sm border border-input focus:outline-none focus:border-blue-600"
                  rows={3}
                  placeholder="Add internal notes about this order..."
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setShowNotesInput(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Notes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setAdminNotes(order.adminNotes || '');
                      setShowNotesInput(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {order.adminNotes ? (
                  <>
                    <p className="text-sm text-blue-900 dark:text-blue-300 mb-2">{order.adminNotes}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowNotesInput(true)}
                      className="text-xs"
                    >
                      Edit Notes
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowNotesInput(true)}
                    className="text-xs"
                  >
                    Add Notes
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Status Update Actions */}
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-3">Update Status</h3>
            <p className="text-xs text-green-800 dark:text-green-300 mb-3">Current status: {order.status}</p>

            {nextStatus ? (
              <Button
                onClick={() => handleStatusUpdate(nextStatus)}
                disabled={isUpdating}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  `Mark as ${nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}`
                )}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Order is already delivered</p>
            )}

            {order.status !== 'cancelled' && (
              <Button
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={isUpdating}
                variant="destructive"
                className="w-full mt-2"
              >
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
