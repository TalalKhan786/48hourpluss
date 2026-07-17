# Admin Panel Setup & Credentials

## Quick Access

**Admin Panel URL**: `http://localhost:3000/admin/login`

### Default Test Credentials

```
Username: admin
Password: password123
```

---

## Setting Up Admin Credentials

### 1. Environment Variables

Add these to your `.env.local` or `.env.development.local` file:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
```

**Important**: Change these credentials before deploying to production!

### 2. Production Credentials

For production deployment, set strong credentials:

```env
ADMIN_USERNAME=your_secure_admin_username
ADMIN_PASSWORD=your_very_secure_password_with_special_chars
JWT_SECRET=generate-a-random-64-character-secret
```

You can generate a secure secret using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Seeding Test Data

The database includes dummy products for testing. To seed the database:

```bash
# Make sure DATABASE_URL is set in .env
npm run seed
```

This will create:
- 6 test products across 2 categories
- Sample reviews and ratings
- Hero slides
- Showcase videos
- Discount codes

---

## Admin Dashboard Features

### Orders Management (`/admin/orders`)
- View all pending, confirmed, shipped, and delivered orders
- See customer details: Name, Father Name, Contact, Address
- View payment proof screenshots
- Update order status
- Add admin notes

### Products Management (`/admin/products`)
- Create, read, update, delete products
- Manage product images and ingredients
- Set pricing and stock levels
- Add product reviews

### Categories Management (`/admin/categories`)
- Create and manage product categories
- Organize products by category

### Hero Slides (`/admin/hero-slides`)
- Manage homepage banner slides
- Set slide order and visibility

### Showcase Videos (`/admin/showcase-videos`)
- Upload showcase videos
- Configure video order and badge text

### Reviews Management (`/admin/reviews`)
- Manage customer video and text reviews
- Activate/deactivate reviews

---

## Authentication System

### How It Works

1. **Login**: User submits username/password at `/admin/login`
2. **Verification**: Credentials checked against environment variables
3. **JWT Token**: Secure JWT token generated (valid for 24 hours)
4. **Session Cookie**: Token stored in httpOnly secure cookie
5. **Middleware Protection**: All `/admin/*` routes protected by middleware
6. **Automatic Logout**: Session expires after 24 hours

### Session Management

- Session duration: 24 hours
- Cookies: httpOnly, secure, sameSite: strict
- Logout: Clears session cookie immediately
- Protection: Middleware verifies JWT on every request

---

## Database Schema

### Core Models

**Order**
- Customer name, father name, contact, address
- Order items with pricing
- Payment proof URL
- Status tracking (pending, confirmed, shipped, delivered)
- Admin notes

**Product**
- Name, slug, price, description
- Category relationship
- Images, ingredients, reviews
- Stock levels
- Active/inactive status

**Category**
- Name, slug, description
- Associated products

---

## Testing the System

### 1. Seed Database
```bash
npm run seed
```

### 2. Login to Admin
- Go to: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `password123`

### 3. Test Orders
- Go to storefront
- Add products to cart
- Click "Proceed to Checkout"
- Fill order form
- Submit order
- Check `/admin/orders` to see it

### 4. Manage Products
- Go to `/admin/products`
- View 6 seeded test products
- Create, edit, or delete products

---

## Security Notes

### Current Implementation
- JWT tokens with HS256 algorithm
- httpOnly cookies (JavaScript cannot access)
- Secure cookie flag in production
- SameSite: strict to prevent CSRF
- Token expiration after 24 hours

### Recommendations for Production

1. **Change credentials**: Don't use default `admin/password123`
2. **Add rate limiting**: Prevent brute force attacks on login
3. **Enable HTTPS**: Secure cookie flag requires HTTPS in production
4. **Backup authentication**: Consider adding two-factor authentication
5. **Audit logging**: Log all admin actions
6. **IP whitelisting**: Restrict admin access to specific IPs

---

## Troubleshooting

### Can't Login
- Check `.env.local` has correct ADMIN_USERNAME and ADMIN_PASSWORD
- Ensure JWT_SECRET is set (minimum 32 characters)
- Clear browser cookies and try again

### Session Expired
- JWT tokens expire after 24 hours
- Login again to get a new token
- Check browser console for error messages

### Can't See Orders
- Make sure database is seeded: `npm run seed`
- Orders appear in `/admin/orders` tab
- Submit a test order from storefront to see it

### Database Connection Error
- Check DATABASE_URL in `.env.local`
- Ensure database is running
- Run migrations: `npx prisma migrate deploy`

---

## File Locations

- **Login Page**: `/app/admin/login/page.tsx`
- **Auth API**: `/app/api/auth/route.ts`
- **Middleware**: `/middleware.ts`
- **Orders Dashboard**: `/app/admin/orders/page.tsx`
- **Seed Script**: `/prisma/seed.ts`
- **Schema**: `/prisma/schema.prisma`

---

## API Endpoints

### Authentication
- `POST /api/auth` - Login (create session)
- `DELETE /api/auth` - Logout (clear session)

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get specific order
- `PATCH /api/orders/[id]` - Update order status

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Seed database
npm run seed

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Access admin
# Browser: http://localhost:3000/admin/login
# Credentials: admin / password123
```

---

## Next Steps

1. Set up environment variables
2. Seed the database with test data
3. Start dev server
4. Test login with default credentials
5. Create a test order
6. Verify order appears in admin panel
7. Change credentials before production
8. Deploy to Vercel

Good luck with your e-commerce platform!
