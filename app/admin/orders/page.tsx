'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Truck, Package, Eye } from 'lucide-react';
import OrderDetailModal from '@/components/OrderDetailModal';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/orders');
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        filterOrders(data.orders, 'all');
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Error fetching orders');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = (orderList: any[], status: string) => {
    if (status === 'all') {
      setFilteredOrders(orderList);
    } else {
      setFilteredOrders(orderList.filter((order) => order.status === status));
    }
    setStatusFilter(status);
  };

  const handleStatusChange = async (orderId: string, newStatus: string, adminNotes?: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });

      const data = await response.json();
      if (data.success) {
        // Update local state
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus, adminNotes } : order
        );
        setOrders(updatedOrders);
        filterOrders(updatedOrders, statusFilter);

        // If modal is open with this order, update it
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus, adminNotes });
        }
      }
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-600" />;
      case 'delivered':
        return <Package className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
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
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
        <p className="text-muted-foreground mt-2">Manage and process customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shipped}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={(value) => filterOrders(orders, value)} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
              <TabsTrigger value="shipped">Shipped ({stats.shipped})</TabsTrigger>
              <TabsTrigger value="delivered">Delivered ({stats.delivered})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter} className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading orders...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">{error}</div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No orders found</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm font-semibold">{order.orderNumber}</TableCell>
                          <TableCell>
                            <div className="font-medium">{order.customerName}</div>
                            <div className="text-xs text-muted-foreground">{order.fatherName}</div>
                          </TableCell>
                          <TableCell className="text-sm">{order.contactNumber}</TableCell>
                          <TableCell className="text-sm">{order.items.length} items</TableCell>
                          <TableCell className="font-bold">Rs. {order.total.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)} variant="outline">
                              <span className="inline-flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsModalOpen(true);
                              }}
                              className="gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
