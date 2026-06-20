# 48hoursplus — Feature Roadmap

Tracking doc for the rebuild from a static one-page site into a multi-page,
backend-driven site with an admin portal. Built incrementally, one feature
at a time. Commit this file to the repo and update checkboxes as we go.

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## 1. Multi-page architecture
Convert the current single long-scroll `app/page.tsx` into real routed pages.
- [ ] `/` — Home (hero + highlights + featured products, trimmed down)
- [ ] `/products` — full catalog (all products as cards)
- [ ] `/products/[slug]` — product detail page
- [ ] `/certificates` — certifications & lab reports
- [ ] `/contact` — contact / FAQ
- [ ] Shared layout (Header, Footer, WhatsApp float) wraps every route
- [ ] Header nav links point to real routes instead of in-page anchors
- [ ] Mobile nav (hamburger menu) added — currently missing entirely

## 2. Backend & data layer
Currently everything is hardcoded in component files; all images are bundled
under `/public`. No persistence, no way to change content without a code
deploy.
- [ ] Define shared data models: Product, Category, Offer/Discount, HeroSlide
- [ ] Phase 1 (dev): JSON-file data store + Next.js Route Handlers as API
- [ ] Phase 2 (prod): real persistent database, since Vercel's filesystem is
      read-only at runtime — JSON-file writes will NOT survive in production.
      Needs a hosted DB (e.g. Vercel Postgres, Neon, Supabase)
- [ ] Image storage: move from bundled `/public` files to an uploadable store
      (Vercel Blob or Cloudinary) so admin-added images don't require a redeploy

## 3. Admin portal
- [ ] Protected `/admin` route (login required)
- [ ] Manage Categories (add/edit/delete)
- [ ] Manage Products (add/edit/delete, CRUD)
- [ ] Manage Offers / Discounts
- [ ] Manage Hero section slides (add/reorder/remove)
- [ ] Image upload UI tied to the image storage from #2

## 4. Product detail page
- [ ] Dynamic route `/products/[slug]`
- [ ] Full description, ingredient breakdown, pricing, image gallery, reviews
      scoped to that specific product
- [ ] "Order via WhatsApp" CTA pre-filled with that product's name & price

## 5. Multiple product cards / catalog
- [ ] Replace the current single hardcoded product with a real product grid
- [ ] Support category filtering
- [ ] Each card links to its own `/products/[slug]` detail page

---

## Suggested build order (dependency-driven)

Features 3, 4, and 5 all depend on having a real **product data model** first,
and the admin portal (3) depends on the **backend** (2) existing. Recommended
sequence:

1. **Data model** — Product/Category/Offer/HeroSlide types + seed data for
   multiple products (foundation everything else builds on)
2. **Multi-page routing** (#1) — using that data, but still static for now
3. **Product catalog + detail pages** (#5, #4) — multiple cards, each with
   its own page
4. **Backend** (#2) — JSON-file API first, then swap to a real DB
5. **Admin portal** (#3) — CRUD UI on top of the backend from step 4

## Known constraints to plan around
- I can write and test all of this code, but I can't push commits to GitHub
  or provision a hosted database/storage account for you — you'll need to
  create those (e.g. a free Neon/Supabase project, Vercel Blob) and share
  credentials, or wire them up yourself following my instructions.
- Until a real DB exists, anything the admin portal "saves" in production
  won't persist between deploys — this is expected during Phase 1.
