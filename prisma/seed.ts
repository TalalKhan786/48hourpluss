// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Clearing database records...');
  await prisma.review.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.heroSlide.deleteMany();

// prisma/seed.ts (Add inside main() function)

  // ... (after other deleteMany statements, add this)
  await prisma.videoReview.deleteMany();
  await prisma.textReview.deleteMany();

  // ... (at the bottom, before console.log('Database seeding successfully finished.'), add this)
  console.log('Seeding customer video reviews...');
  await prisma.videoReview.create({
    data: {
      author: 'Ahmad Khan, Lahore',
      videoUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4',
      order: 1,
      isActive: true,
    }
  });

  await prisma.videoReview.create({
    data: {
      author: 'Kamran Ali, Karachi',
      videoUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4',
      order: 2,
      isActive: true,
    }
  });

  console.log('Seeding customer text reviews...');
  await prisma.textReview.create({
    data: {
      author: 'Zahid Mahmood',
      rating: 5,
      comment: 'Very professional delivery. Product results lasted for a full 48 hours as advertised. Highly recommended!',
      date: '2026-06-15',
      isActive: true,
    }
  });

  await prisma.textReview.create({
    data: {
      author: 'Sohail Akhtar',
      rating: 5,
      comment: 'Fast response on WhatsApp. This honey formula is incredibly pure and powerful. Will buy again!',
      date: '2026-06-20',
      isActive: true,
    }
  });

  console.log('Seeding categories...');
  const skincare = await prisma.category.create({
    data: {
      name: 'Skincare',
      slug: 'skincare',
      description: 'Premium dermal hydrators.',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&auto=format&fit=crop&q=80',
    },
  });

  const wellness = await prisma.category.create({
    data: {
      name: 'Wellness',
      slug: 'wellness',
      description: 'Organic dietary botanicals.',
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=100&auto=format&fit=crop&q=80',
    },
  });

  console.log('Seeding products...');
  await prisma.product.create({
    data: {
      name: 'Hydrating Hyaluronic Serum',
      slug: 'hydrating-hyaluronic-serum',
      // Updated pricing string to standard PKR format
      price: 'Rs. 2,499',
      description: 'A lightweight serum designed to deeply hydrate and plump skin layers.',
      categorySlug: skincare.slug,
      stock: 50,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: 'Hyaluronic Acid' },
          { name: 'Provitamin B5' },
          { name: 'Glycerin' },
        ],
      },
      reviews: {
        create: [
          { author: 'Sarah M.', rating: 5, comment: 'Plumped up my skin beautifully!', date: '2026-05-12' },
        ],
      },
    },
  });

  // prisma/seed.ts (Add inside main() function)

  // ... (after other deleteMany statements, add this)
  await prisma.showcaseVideo.deleteMany();

  // ... (at the bottom, before console.log('Database seeding successfully finished.'), add this)
  console.log('Seeding showcase videos...');
  await prisma.showcaseVideo.create({
    data: {
      title: 'Herbal Honey for You',
      badgeText: 'Product Demo',
      videoUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4',
      order: 1,
      isActive: true,
    }
  });

  await prisma.showcaseVideo.create({
    data: {
      title: '48 Hours Plus',
      badgeText: 'Ingredients',
      videoUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-BcjxTQqEgmIXohURl79ynqgmdrUsTh.mp4',
      order: 2,
      isActive: true,
    }
  });

  await prisma.product.create({
    data: {
      name: 'Organic Matcha Powder',
      slug: 'organic-matcha-powder',
      // Updated pricing string to standard PKR format
      price: 'Rs. 1,999',
      description: 'Ceremonial grade organic green tea powder sourced directly from Uji, Japan.',
      categorySlug: wellness.slug,
      stock: 25,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: '100% Ceremonial Matcha Green Tea' },
        ],
      },
    },
  });

  console.log('Seeding discount offers...');
  await prisma.offer.create({
    data: {
      code: 'HEALTH10',
      discountType: 'percentage',
      value: 10.0,
      isActive: true,
      expiresAt: '2026-12-31',
    },
  });

  console.log('Seeding hero slides...');
  await prisma.heroSlide.create({
    data: {
      title: 'Premium Clinical Formulations',
      subtitle: 'Discover organic Matcha and medical-grade Hyaluronic serums designed for targeted care.',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&auto=format&fit=crop&q=80',
      linkUrl: '/products/hydrating-hyaluronic-serum',
      order: 1,
      isActive: true,
    },
  });

  console.log('Database seeding successfully finished.');
}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });