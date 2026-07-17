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

  // Additional test products
  await prisma.product.create({
    data: {
      name: '48 Hours Plus Herbal Honey',
      slug: '48-hours-plus-herbal-honey',
      price: 'Rs. 3,499',
      description: 'Premium herbal honey formulation for enhanced vitality and performance.',
      categorySlug: wellness.slug,
      stock: 100,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1587049352781-30dbd3d2eda9?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: 'Pure Herbal Extract' },
          { name: 'Premium Honey' },
          { name: 'Natural Aphrodisiac Herbs' },
          { name: 'Ginseng Root' },
        ],
      },
      reviews: {
        create: [
          { author: 'Hassan R.', rating: 5, comment: 'Excellent quality and results!', date: '2026-06-10' },
          { author: 'Akram K.', rating: 5, comment: 'Best product I have used!', date: '2026-06-12' },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Vitamin C Brightening Face Mask',
      slug: 'vitamin-c-brightening-face-mask',
      price: 'Rs. 1,799',
      description: 'Intensive brightening mask with 20% Vitamin C complex for radiant skin.',
      categorySlug: skincare.slug,
      stock: 40,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: 'Vitamin C Complex (20%)' },
          { name: 'Turmeric Extract' },
          { name: 'Chamomile' },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Retinol Night Serum Advanced',
      slug: 'retinol-night-serum-advanced',
      price: 'Rs. 2,899',
      description: 'Advanced night serum with encapsulated retinol for anti-aging benefits.',
      categorySlug: skincare.slug,
      stock: 30,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: 'Encapsulated Retinol' },
          { name: 'Hyaluronic Acid' },
          { name: 'Peptides' },
          { name: 'Squalane' },
        ],
      },
      reviews: {
        create: [
          { author: 'Fatima A.', rating: 5, comment: 'My skin looks so much better!', date: '2026-05-20' },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Organic Ashwagandha Capsules',
      slug: 'organic-ashwagandha-capsules',
      price: 'Rs. 1,599',
      description: 'Premium organic Ashwagandha for stress relief and vitality.',
      categorySlug: wellness.slug,
      stock: 60,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1505252585461-04db1267ae5b?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: 'Organic Ashwagandha Root' },
          { name: 'Black Pepper Extract' },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Intensive Moisturizing Cream',
      slug: 'intensive-moisturizing-cream',
      price: 'Rs. 2,299',
      description: 'Rich, nourishing cream for deep hydration and skin barrier repair.',
      categorySlug: skincare.slug,
      stock: 45,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: 'Ceramides' },
          { name: 'Collagen' },
          { name: 'Vitamin E' },
          { name: 'Argan Oil' },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Pure Ginger Turmeric Tea',
      slug: 'pure-ginger-turmeric-tea',
      price: 'Rs. 899',
      description: 'Organic ginger and turmeric blend for immune support and inflammation relief.',
      categorySlug: wellness.slug,
      stock: 80,
      isActive: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1597318086503-fd752c147066?w=600&auto=format&fit=crop&q=80' },
        ],
      },
      ingredients: {
        create: [
          { name: 'Organic Ginger Root' },
          { name: 'Organic Turmeric' },
          { name: 'Black Pepper' },
          { name: 'Cinnamon' },
        ],
      },
      reviews: {
        create: [
          { author: 'Bilal M.', rating: 4, comment: 'Great taste and health benefits!', date: '2026-06-05' },
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
