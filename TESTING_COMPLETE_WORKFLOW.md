# Complete Testing Workflow Guide

## Step 1: Set Up Environment Variables

Create `.env.local` in the project root with these credentials:

```env
# Database Configuration
DATABASE_URL=your_database_url_here
DIRECT_URL=your_direct_database_url_here

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123

# JWT Secret (for admin session security)
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
```

If you don't have a database, you'll still see the UI but can't persist data.

---

## Step 2: Seed Test Products (Optional)

If you have a database connected, seed dummy products:

```bash
npm run seed
```

This creates:
- 6 products (48 Hours Honey, Matcha, Face Masks, Serums, Capsules, Tea)
- 2 categories (Skincare, Wellness)
- Hero slides
- Showcase videos
- Customer reviews

---

## Step 3: Start Development Server

```bash
npm run dev
```

Opens at: `http://localhost:3000`

---

## Step 4: Test Customer Flow

### 4.1 Browse Products
- Navigate to `http://localhost:3000`
- Scroll homepage - see featured products
- Click "Products" - see all products with pagination
- Test category filters
- Test pagination (12 items per page)

### 4.2 View Product Details
- Click any product
- See full details, ingredients, reviews
- Check responsive design

### 4.3 Add to Cart
- Click "Add to Cart" button
- See cart icon update
- Cart drawer slides in from right

### 4.4 Checkout Flow
1. Click "Proceed to Checkout" in cart
2. Fill form:
   - Name: John Doe
   - Father Name: Ahmed Doe
   - Contact: 03001234567
   - Address: House 123, Street 456, Karachi
3. Upload payment proof screenshot (optional)
4. Click "Submit Order"
5. See success message with order number

---

## Step 5: Test Admin Panel

### 5.1 Login
- Go to `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `password123`
- Click "Login to Dashboard"

### 5.2 View Orders
- Should see "Orders" in left sidebar
- Click "Orders"
- See orders table with:
  - Order number
  - Customer name
  - Contact
  - Total amount
  - Status
  - Action buttons

### 5.3 Manage Order
- Click "View" on any order
- See complete order details:
  - All order items with prices
  - Customer information
  - Payment proof screenshot
  - Current status
- Update status: Pending → Confirmed → Shipped → Delivered
- Add admin notes
- Click "Update Status"

### 5.4 Manage Products
- Click "Products" in sidebar
- See all products
- Create new product
- Edit existing product
- Delete product
- Manage images and ingredients

### 5.5 Other Admin Features
- **Categories**: Create/edit categories
- **Hero Slides**: Manage homepage banners
- **Videos**: Manage showcase videos
- **Reviews**: Approve/deactivate reviews

### 5.6 Logout
- Click "Logout" button (top right)
- Redirected to homepage

---

## Step 6: Test Performance

### 6.1 Homepage Loading
- Should load in 1.5-2 seconds
- Featured products load first
- Videos lazy load on scroll

### 6.2 Products Page
- Pagination loads 12 items at a time
- Filtering by category works
- Pagination controls appear

### 6.3 Product Details
- Images load lazily
- Ingredients and reviews visible
- Responsive on mobile

---

## Step 7: Test Responsive Design

### 7.1 Mobile View
```bash
# In browser dev tools
- Set viewport to iPhone 12 (390x844)
- Test all pages
- Check cart drawer
- Check admin sidebar
```

### 7.2 Tablet View
```bash
# In browser dev tools
- Set viewport to iPad (768x1024)
- Test layout
```

### 7.3 Desktop View
```bash
# Standard 1920x1080
- Full layout works
- Sidebar always visible
```

---

## Troubleshooting

### Issue: Can't Login to Admin
**Solution**: 
- Check `.env.local` has correct credentials
- Clear browser cookies
- Try incognito/private window

### Issue: No Products Showing
**Solution**:
- Seed database: `npm run seed`
- Check database connection in `.env.local`
- Refresh page

### Issue: Cart Not Working
**Solution**:
- Clear browser storage
- Check browser console for errors
- Make sure CartProvider is initialized

### Issue: Payment Proof Upload Fails
**Solution**:
- Check file is image (JPG, PNG, etc.)
- File size under 5MB
- Browser supports file upload

### Issue: Orders Not Saving
**Solution**:
- Check database connection
- Verify ORDER table exists in schema
- Run Prisma migrations: `npx prisma migrate deploy`

---

## Test Scenarios

### Scenario 1: Complete Purchase Flow
1. Browse products
2. View product details
3. Add multiple items to cart
4. Checkout with all fields
5. Upload payment screenshot
6. See order confirmation
7. Login as admin
8. View order in admin panel
9. Update order status
10. Logout

### Scenario 2: Admin Product Management
1. Login to admin
2. Go to Products
3. Create new product
4. Add images and ingredients
5. Set price and stock
6. Edit the product
7. Delete the product

### Scenario 3: Category Filtering
1. Go to Products page
2. See all products
3. Click "Skincare" filter
4. See only skincare products
5. Check pagination resets
6. Click "All Products"
7. See all again

### Scenario 4: Mobile Checkout
1. Open on mobile device/emulator
2. Browse products (test responsive grid)
3. Add to cart
4. View cart drawer (should be full width on mobile)
5. Checkout
6. Fill form (mobile keyboard)
7. Submit order

---

## Performance Checks

Use Chrome DevTools or similar:

### Lighthouse Score
1. Open DevTools (F12)
2. Go to Lighthouse
3. Generate report
4. Should see:
   - Performance: 80+
   - Accessibility: 90+
   - Best Practices: 80+
   - SEO: 90+

### Web Vitals
1. Open DevTools Console
2. Check for Core Web Vitals:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

### Network Tab
1. Open DevTools Network tab
2. Reload page
3. Check:
   - Total requests: < 50
   - Total size: < 3MB
   - Slow 3G simulation: Should load in < 5s

---

## Test Credentials

**Storefront**: No login needed - public access

**Admin Panel**:
- URL: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `password123`

---

## API Endpoints to Test (Optional)

Using Postman or cURL:

```bash
# Login
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Get Orders
curl -X GET http://localhost:3000/api/orders \
  -H "Cookie: admin_session=YOUR_JWT_TOKEN"

# Create Order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{...order_data...}'
```

---

## Success Criteria

Your testing is complete when:

✓ Homepage loads in < 2 seconds
✓ Can add products to cart
✓ Can complete checkout
✓ Order appears in admin panel
✓ Can login to admin with credentials
✓ Can update order status
✓ Mobile view works responsively
✓ Pagination works on products page
✓ Images load lazily
✓ Videos play on hover
✓ All filters work
✓ Responsive on mobile, tablet, desktop
✓ Lighthouse score 80+

---

## Next Steps

1. Test with real database connection
2. Configure real payment gateway
3. Set up email notifications
4. Enable SSL/HTTPS
5. Configure custom domain
6. Deploy to production
7. Set up monitoring
8. Configure backups

Enjoy testing your e-commerce platform!
