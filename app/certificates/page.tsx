// app/certificates/page.tsx

import Link from 'next/link';
import CertificatesClient from '@/components/CertificatesClient';

// Cache the certificates page on the Edge and update every 1 hour
export const revalidate = 3600;

export const metadata = {
  title: 'Our Certifications & Quality Assurance',
  description: 'Review our certified quality standards, including ISO 22000, GMP, HACCP, and Halal certifications.',
};

export default function CertificatesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#080602] to-[#170f03] text-zinc-100 py-12 pt-24 px-6 sm:px-8 lg:px-12 transition-colors duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto">
        <CertificatesClient />
      </div>
    </main>
  );
}