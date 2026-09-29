import { Product } from '../types';

import heroImg from '../assets/images/hero_modern_interior_1790695058707.jpg';
import apparelImg from '../assets/images/cat_lifestyle_apparel_1790695071685.jpg';
import lightingImg from '../assets/images/cat_home_lighting_1790695085906.jpg';
import techImg from '../assets/images/cat_tech_audio_1790695099100.jpg';

export { heroImg, apparelImg, lightingImg, techImg };

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Atelier Sculptural Oak Lounge Chair',
    tagline: 'Hand-shaped solid white oak with organic contours and woven cord backing',
    category: 'furniture',
    price: 890,
    originalPrice: 1050,
    rating: 4.9,
    reviewCount: 38,
    image: heroImg,
    gallery: [
      heroImg,
      lightingImg,
      techImg
    ],
    badge: 'Bestseller',
    inStock: true,
    stockQuantity: 12,
    colors: [
      { name: 'Natural White Oak', hex: '#D2B48C' },
      { name: 'Smoked Walnut', hex: '#5D4037' },
      { name: 'Charcoal Ash', hex: '#262626' }
    ],
    description: 'Designed in Copenhagen and crafted by master joiners, the Sculptural Lounge Chair balances architectural tension with enduring ergonomic warmth. Constructed from FSC-certified white oak and finished with an ultra-matte hardwax oil that preserves the tactile grain.',
    highlights: [
      'Solid FSC-certified European White Oak',
      'Ergonomic cantilever recline angle (108°)',
      'Subtle joinery without visible hardware',
      'Treated with breathable, non-toxic bio-wax'
    ],
    specifications: {
      'Dimensions': '78cm W × 82cm D × 72cm H',
      'Seat Height': '38cm',
      'Weight': '16.4 kg',
      'Material': 'Solid European White Oak, Danish Paper Cord',
      'Origin': 'Copenhagen & Porto Atelier'
    },
    shippingInfo: 'Complimentary white-glove delivery in 3–5 business days. Assembled on arrival with packaging removal.',
    isFeatured: true,
    isBestSeller: true,
    reviewsList: [
      {
        id: 'rev-1',
        author: 'Evelyn St. Claire',
        rating: 5,
        date: 'March 14, 2026',
        title: 'An heirloom centerpiece',
        comment: 'The grain of the white oak is astonishing in person. The proportion fits both compact reading nooks and wide open plan living rooms. Incredibly supportive back rest.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Henrik Vane',
        rating: 5,
        date: 'February 28, 2026',
        title: 'Uncompromised craftsmanship',
        comment: 'Every joinery corner feels silky smooth. Arrived flawlessly packed. Well worth the investment.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'Brushed Brass Horizon Pendant',
    tagline: 'Precision-spun solid brass with frosted blown-glass diffuser',
    category: 'lighting',
    price: 340,
    originalPrice: 395,
    rating: 4.8,
    reviewCount: 42,
    image: lightingImg,
    gallery: [
      lightingImg,
      heroImg,
      techImg
    ],
    badge: 'Staff Pick',
    inStock: true,
    stockQuantity: 24,
    colors: [
      { name: 'Brushed Brass', hex: '#D4AF37' },
      { name: 'Matte Charcoal', hex: '#212121' },
      { name: 'Anodized Bronze', hex: '#8C6239' }
    ],
    description: 'Suspended like a celestial disc, the Horizon Pendant casts a warm, glare-free ambient luminescence. The spun solid brass reflects natural day shifts, while the hand-blown opaline glass core softens 2700K warm LED light across dining surfaces or countertops.',
    highlights: [
      'Hand-spun solid brass housing with protective nano-seal',
      'Mouth-blown triplex opal glass diffuser',
      'Triac & 0-10V dimmable down to 1%',
      'Reinforced braided textile suspension cable (3m)'
    ],
    specifications: {
      'Diameter': '42cm',
      'Height': '14cm',
      'Color Temp': '2700K Warm Architectural Glow',
      'Lumen Output': '1450 lm (CRI 97)',
      'Voltage': '110V - 240V Universal'
    },
    shippingInfo: 'Standard 2–4 business days courier dispatch. Includes ceiling canopy and installation hardware.',
    isFeatured: true,
    isNewArrival: false,
    reviewsList: [
      {
        id: 'rev-3',
        author: 'Julian Thorne',
        rating: 5,
        date: 'January 19, 2026',
        title: 'Perfect mood lighting over kitchen island',
        comment: 'The CRI 97 rating makes evening dinners look like a painting. Dims smoothly without buzzing.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-003',
    name: 'Studio Precision ANC Acoustic Headphones',
    tagline: 'CNC aluminum unibody with memory foam magnetic lambskin cushions',
    category: 'tech',
    price: 480,
    rating: 4.9,
    reviewCount: 67,
    image: techImg,
    gallery: [
      techImg,
      heroImg,
      lightingImg
    ],
    badge: 'New Arrival',
    inStock: true,
    stockQuantity: 30,
    colors: [
      { name: 'Obsidian Matte', hex: '#1C1C1E' },
      { name: 'Raw Silver Aluminum', hex: '#D6D6D6' },
      { name: 'Warm Taupe', hex: '#8E8279' }
    ],
    description: 'Engineered for audio purists and architects of sound. Featuring custom 42mm beryllium drivers, hybrid feedforward ANC that cancels ambient frequency bands seamlessly, and high-resolution LDAC / aptX Lossless transmission.',
    highlights: [
      'Custom 42mm Beryllium composite dynamic drivers',
      'Ultra-quiet adaptive noise cancellation with spatial transparency',
      '40-hour playback on a single 45-minute charge',
      'Tactile rotary crown controls — zero capacitive accidental touches'
    ],
    specifications: {
      'Frequency Response': '5Hz – 44kHz (Hi-Res Audio Certified)',
      'Battery Life': '42 Hours with ANC Active',
      'Weight': '284 grams',
      'Connectivity': 'Bluetooth 5.4, 3.5mm Analog & USB-C Audio',
      'Codecs': 'LDAC, aptX Adaptive, AAC, SBC'
    },
    shippingInfo: 'Dispatched within 24 hours. Includes hard magnetic travel case, 3.5mm braided cable, and USB-C audio cord.',
    isFeatured: true,
    isNewArrival: true,
    reviewsList: [
      {
        id: 'rev-4',
        author: 'Arlo Vance',
        rating: 5,
        date: 'March 02, 2026',
        title: 'Audiophile perfection with clean design',
        comment: 'The absence of cheap plastic makes holding these a sheer tactile joy. Transparency mode feels like naked ears.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-004',
    name: 'Japanese Selvedge Raw Cotton Overshirt',
    tagline: 'Heavyweight 380gsm organic raw cotton with horn buttons',
    category: 'apparel',
    price: 220,
    rating: 4.7,
    reviewCount: 51,
    image: apparelImg,
    gallery: [
      apparelImg,
      heroImg,
      lightingImg
    ],
    badge: 'Limited Edition',
    inStock: true,
    stockQuantity: 18,
    colors: [
      { name: 'Ecru / Natural Cotton', hex: '#EAE6DF' },
      { name: 'Indigo Deep Wash', hex: '#202A44' },
      { name: 'Forest Loden', hex: '#3B443B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Woven on vintage shuttle looms in Okayama, Japan, this utilitarian overshirt features a structured drape that molds to your silhouette over seasons of wear. Finished with matte organic horn buttons and concealed chest slip pockets.',
    highlights: [
      'Woven on low-tension shuttle looms in Kojima, Japan',
      '380 gsm 100% GOTS-certified organic cotton',
      'Genuine corozo nut buttons sourced sustainably',
      'Clean boxy relaxed cut with dropped shoulder seam'
    ],
    specifications: {
      'Material': '100% Organic Japanese Cotton',
      'Care': 'Gentle cold wash, line dry inside out',
      'Fit': 'Relaxed architectural fit (true to size)',
      'Origin': 'Kojima, Okayama Pref., Japan'
    },
    shippingInfo: 'Standard 2–3 business days. Free exchanges on sizing within 30 days.',
    isFeatured: true,
    isOffer: false,
    reviewsList: [
      {
        id: 'rev-5',
        author: 'Marcus Bennett',
        rating: 5,
        date: 'February 12, 2026',
        title: 'Incredible texture and weight',
        comment: 'This fabric will last a lifetime. The drape is substantial without being stiff. Layered over a merino tee it looks effortlessly sharp.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-005',
    name: 'Monolithic Travertine Low Plinth Table',
    tagline: 'Honed Roman travertine with natural open pore texture',
    category: 'furniture',
    price: 1150,
    originalPrice: 1350,
    rating: 4.9,
    reviewCount: 19,
    image: heroImg,
    gallery: [heroImg, lightingImg],
    badge: 'Archival',
    inStock: true,
    stockQuantity: 6,
    colors: [
      { name: 'Roman Travertine', hex: '#E3DAC9' },
      { name: 'Nero Marquina Marble', hex: '#1E1E1E' }
    ],
    description: 'Sculpted from a single block of natural travertine stone, each plinth displays distinct sedimentary veining and earthy variations. A low-profile centerpiece that celebrates architectural gravity.',
    highlights: [
      'Authentic quarried Roman stone',
      'Matte honed surface with natural porous character',
      'Subtle chamfered bevel on top edge',
      'Felt-lined protective base pads'
    ],
    specifications: {
      'Dimensions': '100cm L × 60cm W × 28cm H',
      'Weight': '48 kg',
      'Finish': 'Matte honed sealant (water repellent)'
    },
    shippingInfo: 'Freight curbside delivery with scheduled delivery appointment.',
    isFeatured: false,
    isBestSeller: true
  },
  {
    id: 'prod-006',
    name: 'Cast Bronze Incense Burner & Vessel',
    tagline: 'Lost-wax cast raw bronze with hand-patinated finish',
    category: 'objects',
    price: 145,
    rating: 4.9,
    reviewCount: 88,
    image: techImg,
    gallery: [techImg, lightingImg],
    badge: 'Bestseller',
    inStock: true,
    stockQuantity: 45,
    colors: [
      { name: 'Antiqued Bronze', hex: '#6E4D25' },
      { name: 'Raw Spun Brass', hex: '#C5A059' }
    ],
    description: 'Heavily weighted and tactile, this incense holder catches falling ash within its parabolic dish. Accommodates standard Japanese bamboo-core and extruded incense sticks.',
    highlights: [
      'Solid lost-wax cast bronze alloy',
      'Balanced parabolic ash reservoir',
      'Develops a deep natural patina over decades',
      'Gift boxed in handmade mulberry paper box'
    ],
    specifications: {
      'Diameter': '12.5cm',
      'Weight': '820 grams',
      'Hole Size': '2mm & 3.5mm dual bore'
    },
    shippingInfo: 'Dispatched same day if ordered before 2 PM.',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-007',
    name: 'Merino Wool Architectural Blanket',
    tagline: 'Extra-fine 19.5 micron Australian merino jacquard weave',
    category: 'objects',
    price: 260,
    originalPrice: 310,
    rating: 4.8,
    reviewCount: 34,
    image: apparelImg,
    gallery: [apparelImg, heroImg],
    badge: 'Limited Edition',
    inStock: true,
    stockQuantity: 20,
    colors: [
      { name: 'Oatmeal & Slate', hex: '#D6CFC7' },
      { name: 'Mocha & Sand', hex: '#8C7A6B' }
    ],
    description: 'Woven in Biella, Italy using pure combed merino wool. Double-sided geometric jacquard pattern provides two inverse subtle tonal variations for beds or sofas.',
    highlights: [
      '100% Extra-fine Merino Wool (19.5 micron)',
      'Reversible two-tone geometric jacquard pattern',
      'Feather-light yet deeply insulating',
      'Finished with soft hand-twisted fringe'
    ],
    specifications: {
      'Size': '140cm × 200cm',
      'Weight': '920g',
      'Origin': 'Biella, Northern Italy'
    },
    shippingInfo: 'Shipped in cotton canvas dust tote bag.',
    isFeatured: false,
    isOffer: true
  },
  {
    id: 'prod-008',
    name: 'Alabaster Linear Table Luminaire',
    tagline: 'Hand-carved translucent Spanish alabaster with touch dimming',
    category: 'lighting',
    price: 410,
    rating: 4.9,
    reviewCount: 29,
    image: lightingImg,
    gallery: [lightingImg, heroImg],
    badge: 'Staff Pick',
    inStock: true,
    stockQuantity: 15,
    colors: [
      { name: 'Veined Spanish Alabaster', hex: '#F3EFE0' }
    ],
    description: 'Every block of natural alabaster features one-of-a-kind mineral crystallization. When lit from within, the stone radiates a soft volcanic luminescence ideal for bedside tables or console displays.',
    highlights: [
      'Genuine hand-carved Spanish alabaster cylinder',
      'Capacitive brass touch dimmer (3 brightness stages)',
      'Integrated warm 2400K-3000K warm-dim LED module',
      'Rechargeable or continuous USB-C powered'
    ],
    specifications: {
      'Height': '26cm',
      'Diameter': '11cm',
      'Battery': '14 hours cordless usage'
    },
    shippingInfo: 'Double-boxed with impact-absorbing foam packaging.',
    isFeatured: true,
    isNewArrival: true
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Objects',
    slug: 'all',
    description: 'Explore the complete curated catalog of architectural pieces, apparel, and acoustics.',
    itemCount: 8,
    image: heroImg
  },
  {
    id: 'furniture',
    name: 'Furniture & Living',
    slug: 'furniture',
    description: 'Solid hardwoods, natural travertine, and heirloom seating engineered for enduring presence.',
    itemCount: 2,
    image: heroImg
  },
  {
    id: 'lighting',
    name: 'Architectural Lighting',
    slug: 'lighting',
    description: 'Spun brass pendants, frosted glass, and carved alabaster illuminating modern spaces.',
    itemCount: 2,
    image: lightingImg
  },
  {
    id: 'apparel',
    name: 'Apparel & Textiles',
    slug: 'apparel',
    description: 'Japanese shuttle-loom cottons, heavyweight overshirts, and fine Italian merino wools.',
    itemCount: 2,
    image: apparelImg
  },
  {
    id: 'tech',
    name: 'Acoustics & Precision Tech',
    slug: 'tech',
    description: 'CNC aluminum unibodies, audiophile beryllium drivers, and tactile desk instruments.',
    itemCount: 1,
    image: techImg
  },
  {
    id: 'objects',
    name: 'Curated Objects',
    slug: 'objects',
    description: 'Lost-wax bronze incense vessels, hand-woven throws, and tactile homeware accessories.',
    itemCount: 2,
    image: techImg
  }
];
