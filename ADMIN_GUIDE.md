# Admin Guide - 48 Hours Plus E-Commerce Platform

## Accessing the Admin Portal

1. Navigate to `http://yourdomain.com/admin/orders`
2. You should see the Orders Management Dashboard

## Dashboard Overview

### Top Statistics

Shows quick metrics:
- **Total Orders** - Total number of all orders
- **Pending** - Orders awaiting confirmation
- **Confirmed** - Orders approved but not shipped
- **Shipped** - Orders in transit
- **Delivered** - Successfully delivered orders

### Orders Table

Displays all orders with columns:
- **Order #** - Order reference number (e.g., "clk4x2z5...")
- **Customer** - Customer name and father's name
- **Contact** - Phone number for communication
- **Items** - Number of products ordered
- **Total** - Final amount including shipping
- **Status** - Current order status with color indicator
- **Date** - When order was placed
- **Actions** - View button to see details

### Status Tabs

Filter orders by status:
- **All** - Show all orders
- **Pending** - Orders with payment proof uploaded, awaiting confirmation
- **Confirmed** - Orders you've approved, ready to pack
- **Shipped** - Orders sent out, in delivery
- **Delivered** - Orders completed
- **Cancelled** - Cancelled orders

## Processing an Order

### Step 1: View Order Details

1. Click the "View" button on any order
2. The Order Detail modal opens showing:
   - Order number and status badge
   - Order date and time
   - Customer information (Name, Father's Name, Contact, Address)
   - Complete list of items ordered
   - Order summary (subtotal, shipping, total)
   - Payment proof screenshot
   - Delivery notes from customer

### Step 2: Verify Payment

1. Look for the "Payment Proof" section
2. A screenshot of the customer's payment is displayed
3. Verify the transaction details match the order total
4. Check that the amount received is correct

### Step 3: Update Status

In the "Update Status" section (green box at bottom):

**To Mark as Confirmed:**
1. Click "Mark as Confirmed" button
2. Order automatically moves from Pending to Confirmed status
3. Customer is recorded in system

**To Add Admin Notes:**
1. Click "Add Notes" button (if no notes exist) or "Edit Notes"
2. Enter internal notes (e.g., "Payment received from EasyPaisa at 2:30 PM")
3. Click "Save Notes"
4. Notes are stored with the order

### Step 4: Mark for Shipping

1. Once order is confirmed and you're ready to ship:
2. Click "Mark as Shipped"
3. This moves order to Shipped status
4. Indicates order is with courier

### Step 5: Mark as Delivered

1. Once customer receives order:
2. Click "Mark as Delivered"
3. Order is marked complete
4. Removes from active processing list

## Order Status Workflow

```
Pending (Payment Proof Uploaded)
    ↓
Confirmed (You approved it)
    ↓
Shipped (In transit)
    ↓
Delivered (Customer received)
```

## Managing Admin Notes

Admin notes are internal comments visible only to admins. Use them to track:
- Payment confirmation details
- Tracking information
- Shipping address notes
- Customer follow-up needed
- Any special handling requirements

### How to Add/Edit Notes:

1. Click the order to view details
2. Scroll to "Admin Notes" section (blue box)
3. Click "Add Notes" or "Edit Notes"
4. Type your internal notes
5. Click "Save Notes"

## Filtering and Searching

### By Status:
1. Click the status tab you want to view
2. Only orders with that status appear

### Quick Statistics:
- Count badges on each tab show how many orders are in each status
- Focus on "Pending" tab to see orders awaiting confirmation

## Common Tasks

### Process New Orders

1. Go to Admin Panel → Orders
2. Click "Pending" tab
3. For each order:
   - Click View
   - Check payment screenshot
   - Add admin note with confirmation details
   - Click "Mark as Confirmed"
4. Once confirmed:
   - Mark as Shipped when you ship
   - Mark as Delivered when confirmed delivered

### Find a Specific Order

1. Look at the Orders table
2. Scan the "Order #" column for the order number
3. Or scroll through tabs to find it by status
4. Click View to open order details

### Check Order History

1. The Orders table shows all historical orders
2. Use tabs to filter by status
3. Older orders stay in "Delivered" or "Cancelled" tabs
4. Scroll table to find older orders

### Handle Cancelled Orders

If an order needs to be cancelled:
1. Open the order details
2. In "Update Status" section, click "Cancel Order"
3. Order moves to Cancelled status
4. Cannot be undone - use admin notes to explain why

## Payment Verification Tips

### What to Check on Payment Proof:
1. **Transaction ID** - Matches your payment provider
2. **Amount** - Matches order total
3. **Date/Time** - Recent (same day as order placement)
4. **Recipient** - Your business account name
5. **Status** - Shows "Success" or "Completed"

### Common Payment Methods:
- EasyPaisa - Look for "EasyPaisa" logo and M-Account transfer
- JazzCash - Look for "JazzCash" logo and transaction ID
- Bank Transfer - Receipt from bank with account number
- Stripe/PayPal - Digital receipt with transaction confirmation

## Troubleshooting

### Order Not Appearing in Table
- Refresh the page
- Check if it might be in a different status tab
- Look in "All Orders" tab

### Payment Proof Not Showing
- Customer may not have uploaded it
- Click View to check if upload happened
- Contact customer to request payment proof

### Status Update Not Working
- Ensure you're clicking the correct button
- Wait a moment for the update to process
- Refresh page to confirm update

## Notifications (When Implemented)

Future updates will include:
- Email notifications when new orders arrive
- SMS alerts for important status changes
- Customer notifications when order status updates

---

## Contact Support

If you encounter any issues:
1. Check this guide first
2. Ensure database is connected
3. Try refreshing the page
4. Check browser console for errors (F12)

---

**Remember:** Always verify payment proof before confirming orders. This protects both you and your customers.
