// components/CertificatesClient.tsx
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  CheckCircle2, 
  MessageCircle, 
  X,
  Eye
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CertificatesClient() {
  const [activeDocUrl, setActiveDocUrl] = useState<string | null>(null);

  const certificates = [
    {
      name: "NANOLAB Safety Analysis",
      description: "Heavy metals and toxins test - All results: Not Detected ✓",
      icon: ShieldCheck,
      image: "/images/nanolab-report-preview.png",
      details: "Arsenic, Mercury, Cadmium, Lead: Not Detected",
      reportNumber: "1363/0/16.04.2024",
      accreditation: "TÜRKAK Accredited AB-0566-T",
    },
    {
      name: "Certificate of Analysis",
      description: "Complete nutritional breakdown and ingredient verification",
      icon: Award,
      image: "/images/certificate-analysis-preview.png",
      details: "Verified nutritional content and 2-year shelf life",
      reportNumber: "COA-48HP-2024",
      accreditation: "Official Company Certificate",
    },
    {
      name: "Quality Management Certificates",
      description: "ISO 9001, ISO 22000, GMP & Halal Certifications",
      icon: CheckCircle2,
      image: "/images/iso-9001-certificate.png",
      details: "Complete quality management system certifications",
      reportNumber: "Multiple DSR Certificates",
      accreditation: "DSR Certification - Valid until 2027",
      additionalCertificates: [
        {
          name: "ISO 9001:2015 Quality Management",
          image: "/images/iso-9001-certificate.png",
          reportNumber: "QMS-20.03.393",
          accreditation: "DSR Certification - Quality Management System",
        },
        {
          name: "Halal Certificate TS OIC/SMIIC",
          image: "/images/halal-certificate.png",
          reportNumber: "H-20.03.123",
          accreditation: "DSR Certification - Halal Food System",
        },
        {
          name: "GMP Certificate",
          image: "/images/gmp-certificate.png",
          reportNumber: "GMP-20.03.393",
          accreditation: "DSR Certification - Good Manufacturing Practices",
        },
        {
          name: "ISO 22000:2018 Food Safety",
          image: "/images/iso-22000-certificate.png",
          reportNumber: "FSMS-20.03.393",
          accreditation: "DSR Certification - Food Safety Management",
        },
      ],
    },
  ];

  const testResults = [
    { test: "Ochratoxin A", result: "Not Detected", status: "✓" },
    { test: "Arsenic (Heavy Metal)", result: "Not Detected", status: "✓" },
    { test: "Mercury (Heavy Metal)", result: "Not Detected", status: "✓" },
    { test: "Cadmium (Heavy Metal)", result: "Not Detected", status: "✓" },
    { test: "Lead (Heavy Metal)", result: "Not Detected", status: "✓" },
  ];

  const nutritionalInfo = [
    { nutrient: "Energy", value: "253 kj / 60 kcal per 20g" },
    { nutrient: "Total Fat", value: "2.3g per serving" },
    { nutrient: "Carbohydrates", value: "6.02g per serving" },
    { nutrient: "Protein", value: "0.86g per serving" },
    { nutrient: "Shelf Life", value: "2 Years Verified" },
  ];

  return (
    /* Standardized horizontally with your dynamic navbar [2] */
    <div className="container mx-auto px-4 space-y-16">
      
      {/* Dynamic Breadcrumbs */}
      <nav className="mb-4">
        <Link href="/products" className="text-sm font-semibold text-yellow-600 hover:text-yellow-500">
          &larr; Back to Catalog
        </Link>
      </nav>

      {/* Section Header */}
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full select-none uppercase tracking-widest font-semibold">
            <Award className="w-3.5 h-3.5 mr-1.5" />
            Sovereign Quality Assurance
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white font-serif">
            Certified <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-medium">Excellence</span>
          </h1>
          <p className="text-zinc-400 font-light text-base leading-relaxed">
            Our commitment to quality is backed by rigorous testing and official certifications. Click on certificates to view full images [2].
          </p>
        </div>
      </ScrollReveal>

      {/* 
         SECTION 1: THE 3 MAJOR REPORT CARDS (OBSIDIAN GLASSMOPHISM)
         Height and width are perfectly responsive. Hovering reveals a "View Document" overlay [1].
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <div 
              onClick={() => setActiveDocUrl(cert.image)}
              className="group rounded-3xl border border-zinc-900 bg-zinc-950/40 p-5 flex flex-col justify-between hover:border-yellow-500/30 hover:shadow-lg dark:hover:shadow-yellow-500/[0.01] transition-all duration-300 h-full cursor-pointer"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/80 mb-5">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-[10px] sm:text-xs bg-black/80 text-yellow-400 font-semibold px-3 py-1.5 rounded-full border border-zinc-800 flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      Zoom Report
                    </span>
                  </div>
                </div>

                <div className="text-left space-y-1.5">
                  <h3 className="text-md sm:text-lg font-bold text-white font-serif leading-tight">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-2">
                    {cert.description}
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold leading-relaxed pt-1 select-none">
                    {cert.details}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900/60 text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Report #:</span>
                  <span className="text-white font-mono text-xs">{cert.reportNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Accreditation:</span>
                  <span className="text-yellow-500 text-xs">{cert.accreditation}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* 
         SECTION 2: DSR QUALITY CERTIFICATIONS
         Enforced exactly 2 columns on mobile (grid-cols-2) and 4 on desktop (lg:grid-cols-4) [2].
      */}
      <div className="space-y-6 border-t border-zinc-900/50 pt-16">
        <h3 className="text-xl sm:text-2xl font-bold text-center text-white font-serif">DSR Quality Certifications</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certificates[2].additionalCertificates?.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div 
                onClick={() => setActiveDocUrl(cert.image)}
                className="group rounded-3xl border border-zinc-900 bg-zinc-950/40 p-4 flex flex-col justify-between hover:border-yellow-500/30 hover:shadow-lg dark:hover:shadow-yellow-500/[0.01] transition-all duration-300 h-full cursor-pointer"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/80 mb-4">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-[10px] bg-black/80 text-yellow-400 font-semibold px-2 py-1 rounded-full border border-zinc-850 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Zoom
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-left space-y-1">
                    <h4 className="text-sm font-bold text-yellow-400 font-serif leading-tight line-clamp-2">
                      {cert.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-mono">#{cert.reportNumber}</p>
                    <p className="text-[10px] text-emerald-400 font-medium tracking-wide mt-1">
                      {cert.accreditation}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* 
         SECTION 3: ANALYTICAL TABLES (NANOLAB VS NUTRITIONAL)
         Side-by-side on desktop, stacked on mobile [2].
         Transformed with Obsidian Glassmorphic styling [2].
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-zinc-900/50 pt-16">
        
        {/* Nanolab test results table */}
        <ScrollReveal>
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 sm:p-8 h-full">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-zinc-900 pb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              NANOLAB Heavy Metals Test Results
            </h3>
            <div className="space-y-3">
              {testResults.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-zinc-950/30 border border-zinc-900 rounded-2xl transition-colors hover:bg-zinc-900/20">
                  <span className="text-white font-medium text-xs sm:text-sm">{test.test}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold text-xs sm:text-sm">{test.result}</span>
                    <span className="text-emerald-400 text-lg leading-none">{test.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-950/10 rounded-2xl border border-emerald-500/20 text-left">
              <p className="text-emerald-400 text-xs sm:text-sm font-semibold">✓ Heavy metals, lead & toxins: ZERO DETECTION</p>
              <p className="text-zinc-500 text-[10px] sm:text-xs mt-1 leading-normal">
                Tested by TÜRKAK accredited analytical laboratory (AB-0566-T).
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Nutritional info table */}
        <ScrollReveal>
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-6 sm:p-8 h-full">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-zinc-900 pb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              Nutritional Analysis & Ingredients
            </h3>
            <div className="space-y-3">
              {nutritionalInfo.map((info, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-zinc-950/30 border border-zinc-900 rounded-2xl transition-colors hover:bg-zinc-900/20">
                  <span className="text-white font-medium text-xs sm:text-sm">{info.nutrient}</span>
                  <span className="text-yellow-400 font-bold text-xs sm:text-sm">{info.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-500/[0.02] rounded-2xl border border-yellow-500/10 text-left">
              <p className="text-yellow-400 text-xs sm:text-sm font-semibold">✓ Complete nutritional integrity verified</p>
              <p className="text-zinc-500 text-[10px] sm:text-xs mt-1 leading-normal">
                Natural ingredients: Saffron, Maca Root, Ashwagandha, and pure raw honey base.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Global Conversions CTA */}
      <ScrollReveal>
        <div className="text-center border-t border-zinc-900 pt-16 max-w-2xl mx-auto space-y-6">
          <div className="bg-yellow-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center border border-yellow-500/20 mx-auto">
            <ShieldCheck className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Our Quality Commitment
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            We understand that personal wellness requires absolute transparency. If you require copies of our physical chemical analysis sheets, please contact our support team on WhatsApp [2].
          </p>

          <Link href="https://wa.me/923194405935?text=Hi, I would like to request copies of the certificates and laboratory reports." target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-md px-10 py-6 h-auto font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/10 flex items-center justify-center gap-2 mx-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Request Document Copies
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      {/* ====================================================
         FULL-SCREEN LIGHTBOX MODAL:
         Fades and blurs into focus on click. Safely handles closures [1].
         ==================================================== */}
      {activeDocUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in">
          {/* Close trigger boundary */}
          <div className="absolute inset-0" onClick={() => setActiveDocUrl(null)}></div>
          
          <div className="relative max-w-full max-h-[85vh] aspect-video w-[800px] border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950 p-4 shadow-2xl">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image 
                src={activeDocUrl} 
                alt="Enlarged Report" 
                fill 
                className="object-contain" 
              />
            </div>
            
            {/* Close floating button */}
            <button
              onClick={() => setActiveDocUrl(null)}
              className="absolute top-6 right-6 bg-black/60 hover:bg-red-600/80 text-white p-2 rounded-full border border-zinc-800 transition-colors z-20"
              aria-label="Close document viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}