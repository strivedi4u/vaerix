export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  tag: string | null;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  details: string[];
  category: string;
  collection: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  material: string;
  fit: string;
}

export const categories = [
  { id: 'all', name: 'All', count: 0 },
  { id: 'tees', name: 'Tees', count: 0 },
  { id: 'hoodies', name: 'Hoodies', count: 0 },
  { id: 'outerwear', name: 'Outerwear', count: 0 },
  { id: 'accessories', name: 'Accessories', count: 0 },
  { id: 'bottoms', name: 'Bottoms', count: 0 },
];

export const products: Product[] = [
  {
    id: '1',
    slug: 'draconian-protocol-tee',
    name: 'Draconian Protocol Tee',
    price: 4500,
    originalPrice: 5500,
    images: ['/assets/media/1.png', '/assets/media/2.png', '/assets/media/3.png'],
    tag: 'Bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian', hex: '#0a0a0a' },
      { name: 'Parchment', hex: '#f5f1e8' },
    ],
    description: 'The foundational piece of Drop 01. Hand-finished heavyweight cotton adorned with the Draconian Protocol sigil — an alchemical cipher reserved for initiates of the inner circle.',
    details: [
      '300 GSM organic heavyweight cotton',
      'Oversized drop-shoulder construction',
      'Screen-printed alchemical sigil with metallic gold ink',
      'Reinforced ribbed collar',
      'Woven VAELRIX label at hem',
      'Garment-dyed for lived-in feel',
    ],
    category: 'tees',
    collection: 'drop-01',
    rating: 4.9,
    reviews: 142,
    inStock: true,
    material: '100% Organic Cotton',
    fit: 'Oversized',
  },
  {
    id: '2',
    slug: 'alchemist-graphic-hoodie',
    name: 'Alchemist Graphic Hoodie',
    price: 8900,
    originalPrice: 10500,
    images: ['/assets/media/2.png', '/assets/media/1.png', '/assets/media/4.png'],
    tag: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#1a1a1a' },
      { name: 'Aged Ivory', hex: '#e8e0d0' },
    ],
    description: 'A centerpiece hoodie featuring the full Alchemist\'s Codex illustration. Double-layered hood with gold-tipped drawstrings. Heavy enough to armor you against the world.',
    details: [
      '380 GSM French terry cotton',
      'Kangaroo pocket with hidden interior pocket',
      'Gold-tipped waxed drawstrings',
      'Double-layered oversized hood',
      'Embroidered crest at chest',
      'Ribbed cuffs and hem',
    ],
    category: 'hoodies',
    collection: 'drop-01',
    rating: 4.8,
    reviews: 89,
    inStock: true,
    material: '100% French Terry Cotton',
    fit: 'Relaxed Oversized',
  },
  {
    id: '3',
    slug: 'sigil-emblem-cap',
    name: 'Sigil Emblem Cap',
    price: 2800,
    originalPrice: null,
    images: ['/assets/media/3.png', '/assets/media/5.png', '/assets/media/1.png'],
    tag: null,
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
    ],
    description: 'Structured six-panel cap with laser-etched metal sigil badge. Adjustable leather strap with debossed VAELRIX branding.',
    details: [
      'Heavy canvas cotton construction',
      'Laser-etched zinc alloy sigil badge',
      'Genuine leather adjustable strap',
      'Embroidered eyelets with gold finish',
      'Pre-curved structured brim',
    ],
    category: 'accessories',
    collection: 'drop-01',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    material: 'Cotton Canvas / Leather',
    fit: 'Adjustable',
  },
  {
    id: '4',
    slug: 'onyx-heavyweight-tee',
    name: 'Onyx Heavyweight Tee',
    price: 3900,
    originalPrice: null,
    images: ['/assets/media/4.png', '/assets/media/6.png', '/assets/media/2.png'],
    tag: 'Essential',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    colors: [
      { name: 'True Black', hex: '#050505' },
      { name: 'Stone', hex: '#8a8578' },
      { name: 'Ivory', hex: '#f5f1e8' },
    ],
    description: 'The perfect blank canvas, elevated. No graphics, no slogans — pure material excellence. 300 GSM with a sueded hand-feel that gets better with every wash.',
    details: [
      '300 GSM enzyme-washed cotton',
      'Boxy relaxed silhouette',
      'Raw-edge hem finish',
      'Tonal embossed V mark at back neck',
      'Double-needle reinforced seams',
    ],
    category: 'tees',
    collection: 'essentials',
    rating: 5.0,
    reviews: 218,
    inStock: true,
    material: '100% Combed Ring-Spun Cotton',
    fit: 'Boxy Relaxed',
  },
  {
    id: '5',
    slug: 'crest-overcoat',
    name: 'Crest Overcoat',
    price: 18500,
    originalPrice: 22000,
    images: ['/assets/media/5.png', '/assets/media/7.png', '/assets/media/3.png'],
    tag: 'Limited',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Void Black', hex: '#080808' },
    ],
    description: 'A statement piece that bridges Victorian tailoring with modern streetwear proportions. Full Draconidae crest embroidered on the back panel with 12,000 stitches of gold thread.',
    details: [
      'Wool-blend twill shell',
      'Satin-lined interior',
      '12,000-stitch gold embroidered back crest',
      'Horn buttons with V engraving',
      'Inside welt pocket',
      'Numbered limited edition (200 pieces)',
    ],
    category: 'outerwear',
    collection: 'drop-01',
    rating: 5.0,
    reviews: 34,
    inStock: true,
    material: 'Wool Blend / Satin Lining',
    fit: 'Tailored Oversized',
  },
  {
    id: '6',
    slug: 'victorian-science-tee',
    name: 'Victorian Science Tee',
    price: 4800,
    originalPrice: 5800,
    images: ['/assets/media/6.png', '/assets/media/4.png', '/assets/media/1.png'],
    tag: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Ink', hex: '#0e0e1a' },
      { name: 'Off-White', hex: '#f0ece2' },
    ],
    description: 'Featuring a full-panel scientific illustration from the Society\'s archives, rendered in precise halftone dots. The meeting of antiquarian knowledge and contemporary fashion.',
    details: [
      '300 GSM organic cotton',
      'Full-front halftone illustration',
      'Oversized boxy fit',
      'Inside neck print with Society motto',
      'Bio-washed for immediate softness',
    ],
    category: 'tees',
    collection: 'drop-01',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    material: '100% Organic Cotton',
    fit: 'Oversized Boxy',
  },
  {
    id: '7',
    slug: 'archive-cargo-pants',
    name: 'Archive Cargo Pants',
    price: 9800,
    originalPrice: null,
    images: ['/assets/media/7.png', '/assets/media/8.png', '/assets/media/5.png'],
    tag: null,
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Washed Black', hex: '#1a1a1a' },
      { name: 'Olive Drab', hex: '#3a3a2a' },
    ],
    description: 'Utilitarian cargo pant with articulated knees and hidden zip pockets. Finished with woven V-mark tabs and antique brass hardware.',
    details: [
      'Heavy cotton ripstop fabric',
      'Articulated knee panels',
      '8 pockets including 2 hidden zip',
      'Adjustable drawcord at ankle',
      'Antique brass YKK hardware',
      'Woven VAELRIX label at pocket',
    ],
    category: 'bottoms',
    collection: 'archives',
    rating: 4.6,
    reviews: 43,
    inStock: true,
    material: 'Cotton Ripstop',
    fit: 'Relaxed Tapered',
  },
  {
    id: '8',
    slug: 'reign-hoodie',
    name: 'Reign Hoodie',
    price: 7500,
    originalPrice: 9000,
    images: ['/assets/media/8.png', '/assets/media/9.png', '/assets/media/2.png'],
    tag: 'Sale',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Smoke', hex: '#2a2a2a' },
      { name: 'Cream', hex: '#f0e8d8' },
    ],
    description: 'Minimalist heavyweight hoodie with tonal "REIGN" puff-print across the back. The everyday cornerstone for those who dress deliberately.',
    details: [
      '400 GSM brushed fleece interior',
      'Puff-print "REIGN" back graphic',
      'Oversized relaxed fit',
      'Reinforced kangaroo pocket',
      'Metal aglet drawstrings',
    ],
    category: 'hoodies',
    collection: 'essentials',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    material: '100% Cotton Fleece',
    fit: 'Oversized',
  },
  {
    id: '9',
    slug: 'serpent-chain-necklace',
    name: 'Serpent Chain Necklace',
    price: 6500,
    originalPrice: null,
    images: ['/assets/media/9.png', '/assets/media/3.png', '/assets/media/6.png'],
    tag: 'Exclusive',
    sizes: ['18"', '22"'],
    colors: [
      { name: 'Antique Gold', hex: '#c5a35a' },
      { name: 'Sterling', hex: '#c0c0c0' },
    ],
    description: 'Handcrafted serpent-link chain with a micro-V pendant. 18K gold plating over surgical steel. Each link is individually welded for maximum durability.',
    details: [
      '18K gold plating over 316L surgical steel',
      'Serpent-link chain design',
      'Micro crowned-V pendant',
      'Lobster clasp closure',
      'Tarnish-resistant coating',
      'Comes in branded velvet pouch',
    ],
    category: 'accessories',
    collection: 'drop-01',
    rating: 4.9,
    reviews: 78,
    inStock: true,
    material: '18K Gold Plated Surgical Steel',
    fit: 'N/A',
  },
];

// Update category counts
categories.forEach(cat => {
  if (cat.id === 'all') {
    cat.count = products.length;
  } else {
    cat.count = products.filter(p => p.category === cat.id).length;
  }
});

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function getDiscount(price: number, originalPrice: number | null): number {
  if (!originalPrice) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}
