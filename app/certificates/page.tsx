// app/certificates/page.tsx

import CertificatesClient from '@/components/CertificatesClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Certifications & Quality Assurance',
  description: 'Review our certified quality standards, including ISO 22000, GMP, HACCP, and Halal certifications.',
};

export default function CertificatesPage() {
  return (
    /* 
       THEMED CANVAS:
       Applied your signature 3-stop luxury dark gradient directly to the main container.
       pt-24 eliminates the top white-bar gap under the header [2].
    */
    <main className="min-h-screen bg-gradient-to-b from-[#000000] via-[#080602] to-[#170f03] text-zinc-100 py-12 pt-24 px-6 sm:px-8 lg:px-12 transition-colors duration-300 ease-in-out">
      {/* Mount the interactive Client Certificates grid */}
      <CertificatesClient />
    </main>
  );
}