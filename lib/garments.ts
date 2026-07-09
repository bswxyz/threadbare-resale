// ---------------------------------------------------------------------------
// The rack — 12 fictional garments. Every "photo" is a flat SVG illustration
// (see components/GarmentArt.tsx); no image assets anywhere on the site.
// ---------------------------------------------------------------------------

export type Condition = 'NWT' | 'EXC' | 'GOOD' | 'LOVED';
export type Category = 'jackets' | 'knits' | 'denim' | 'dresses' | 'tees' | 'extras';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'OS';

export type ArtKind =
  | 'tee'
  | 'band'
  | 'trucker'
  | 'puffer'
  | 'jeans'
  | 'skirt'
  | 'cardigan'
  | 'breton'
  | 'polka'
  | 'slip'
  | 'bucket'
  | 'tote';

export interface Garment {
  id: string;
  name: string;
  brand: string;
  category: Category;
  size: Size;
  condition: Condition;
  price: number;
  /** days since listing — lower = newer (drives the "Newest" sort) */
  listed: number;
  likes: number;
  art: { kind: ArtKind; bg: string; body: string; accent: string };
  story: {
    owners: number;
    cities: string[];
    co2: number; // kg CO2e saved vs buying new
    note: string;
  };
  seller: { name: string; rating: number; sales: number };
}

export const CONDITION_LABELS: Record<Condition, string> = {
  NWT: 'New with tags',
  EXC: 'Excellent',
  GOOD: 'Good',
  LOVED: 'Loved',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  jackets: 'Jackets',
  knits: 'Knits',
  denim: 'Denim',
  dresses: 'Dresses',
  tees: 'Tees',
  extras: 'Extras',
};

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'OS'];
export const CONDITIONS: Condition[] = ['NWT', 'EXC', 'GOOD', 'LOVED'];

// palette shortcuts (kept literal so the SVGs are self-contained strings)
const COBALT = '#2f4bff';
const LEMON = '#ffe14d';
const BUBBLEGUM = '#ff8fb1';
const INK = '#141414';
const PAPER = '#f6f3ee';

export const GARMENTS: Garment[] = [
  {
    id: 'trucker-01',
    name: 'Broke-in trucker jacket',
    brand: 'Blue Meridian',
    category: 'jackets',
    size: 'M',
    condition: 'LOVED',
    price: 54,
    listed: 2,
    likes: 31,
    art: { kind: 'trucker', bg: LEMON, body: COBALT, accent: PAPER },
    story: {
      owners: 3,
      cities: ['Lisbon', 'Berlin', 'Leeds'],
      co2: 19,
      note: 'Faded exactly where elbows go. Third owner sewed the star patch on.',
    },
    seller: { name: 'juno.sells', rating: 4.9, sales: 212 },
  },
  {
    id: 'puffer-01',
    name: 'Marshmallow puffer',
    brand: 'North Peak',
    category: 'jackets',
    size: 'S',
    condition: 'EXC',
    price: 88,
    listed: 6,
    likes: 24,
    art: { kind: 'puffer', bg: COBALT, body: BUBBLEGUM, accent: INK },
    story: {
      owners: 1,
      cities: ['Oslo'],
      co2: 31,
      note: 'Bought for one ski trip. The trip was cancelled. The coat is furious.',
    },
    seller: { name: 'annik_a', rating: 5.0, sales: 48 },
  },
  {
    id: 'cardigan-01',
    name: 'Grandpa cardigan',
    brand: 'Loop & Purl',
    category: 'knits',
    size: 'XL',
    condition: 'LOVED',
    price: 33,
    listed: 9,
    likes: 47,
    art: { kind: 'cardigan', bg: BUBBLEGUM, body: PAPER, accent: COBALT },
    story: {
      owners: 4,
      cities: ['Cork', 'Bristol', 'Ghent', 'Turin'],
      co2: 12,
      note: 'Four owners, zero moths. Pockets deep enough for two paperbacks.',
    },
    seller: { name: 'woolgather', rating: 4.8, sales: 156 },
  },
  {
    id: 'breton-01',
    name: 'Breton stripe knit',
    brand: 'Quai 34',
    category: 'knits',
    size: 'M',
    condition: 'EXC',
    price: 29,
    listed: 1,
    likes: 18,
    art: { kind: 'breton', bg: PAPER, body: COBALT, accent: PAPER },
    story: {
      owners: 2,
      cities: ['Marseille', 'London'],
      co2: 9,
      note: 'Worn on one ferry and to eleven poetry readings. Smells faintly of sea.',
    },
    seller: { name: 'quai.archive', rating: 4.9, sales: 89 },
  },
  {
    id: 'jeans-01',
    name: 'High-rise straights',
    brand: 'Blue Meridian',
    category: 'denim',
    size: 'S',
    condition: 'GOOD',
    price: 36,
    listed: 4,
    likes: 22,
    art: { kind: 'jeans', bg: LEMON, body: COBALT, accent: LEMON },
    story: {
      owners: 2,
      cities: ['Rotterdam', 'Manchester'],
      co2: 24,
      note: 'Hemmed once, cuffed forever. The knees have opinions now.',
    },
    seller: { name: 'densews', rating: 4.7, sales: 301 },
  },
  {
    id: 'skirt-01',
    name: 'A-line denim skirt',
    brand: 'Ferrous',
    category: 'denim',
    size: 'XS',
    condition: 'EXC',
    price: 27,
    listed: 12,
    likes: 15,
    art: { kind: 'skirt', bg: BUBBLEGUM, body: COBALT, accent: BUBBLEGUM },
    story: {
      owners: 1,
      cities: ['Copenhagen'],
      co2: 11,
      note: 'One careful owner who ironed it. A skirt that has known order.',
    },
    seller: { name: 'kbh.closet', rating: 5.0, sales: 64 },
  },
  {
    id: 'polka-01',
    name: 'Polka midi dress',
    brand: 'Dot Dot Dot',
    category: 'dresses',
    size: 'M',
    condition: 'NWT',
    price: 61,
    listed: 3,
    likes: 53,
    art: { kind: 'polka', bg: COBALT, body: LEMON, accent: INK },
    story: {
      owners: 1,
      cities: ['Vienna'],
      co2: 16,
      note: 'Tags still on. Bought for a wedding that became an elopement.',
    },
    seller: { name: 'wien.wardrobe', rating: 4.9, sales: 132 },
  },
  {
    id: 'slip-01',
    name: 'Cherry slip dress',
    brand: 'Nightbloom',
    category: 'dresses',
    size: 'S',
    condition: 'EXC',
    price: 44,
    listed: 8,
    likes: 38,
    art: { kind: 'slip', bg: PAPER, body: BUBBLEGUM, accent: INK },
    story: {
      owners: 2,
      cities: ['Paris', 'Brighton'],
      co2: 13,
      note: 'Danced through two New Years. Retired undefeated.',
    },
    seller: { name: 'blooms.again', rating: 4.8, sales: 77 },
  },
  {
    id: 'tee-01',
    name: 'Sunbaked ringer tee',
    brand: 'Camp Echo',
    category: 'tees',
    size: 'M',
    condition: 'GOOD',
    price: 18,
    listed: 5,
    likes: 12,
    art: { kind: 'tee', bg: BUBBLEGUM, body: PAPER, accent: COBALT },
    story: {
      owners: 2,
      cities: ['Athens', 'Naxos'],
      co2: 6,
      note: 'Sun did the dye job. Two summers of salt and it still fits like a hug.',
    },
    seller: { name: 'echo.camp', rating: 4.6, sales: 190 },
  },
  {
    id: 'tee-02',
    name: "Band tee, '09 tour",
    brand: 'Static Merch',
    category: 'tees',
    size: 'L',
    condition: 'LOVED',
    price: 25,
    listed: 0,
    likes: 66,
    art: { kind: 'band', bg: LEMON, body: INK, accent: LEMON },
    story: {
      owners: 3,
      cities: ['Glasgow', 'Dublin', 'Hamburg'],
      co2: 6,
      note: 'Survived three mosh pits and one washing-machine incident. A veteran.',
    },
    seller: { name: 'merch.grave', rating: 4.9, sales: 240 },
  },
  {
    id: 'bucket-01',
    name: 'Reversible bucket hat',
    brand: 'Peel',
    category: 'extras',
    size: 'OS',
    condition: 'NWT',
    price: 16,
    listed: 7,
    likes: 9,
    art: { kind: 'bucket', bg: COBALT, body: LEMON, accent: INK },
    story: {
      owners: 1,
      cities: ['Seoul'],
      co2: 3,
      note: 'Never worn. Two hats in one, zero decisions made so far.',
    },
    seller: { name: 'peel.seconds', rating: 4.7, sales: 25 },
  },
  {
    id: 'tote-01',
    name: 'Everyday canvas tote',
    brand: 'Haul',
    category: 'extras',
    size: 'OS',
    condition: 'GOOD',
    price: 14,
    listed: 10,
    likes: 20,
    art: { kind: 'tote', bg: PAPER, body: LEMON, accent: INK },
    story: {
      owners: 2,
      cities: ['Amsterdam', 'Utrecht'],
      co2: 4,
      note: 'Carried groceries, library books, and one very patient cat.',
    },
    seller: { name: 'bag.it.again', rating: 4.8, sales: 118 },
  },
];

// aggregate impact stats for the carbon band (sum of the catalog, scaled to
// a fictional marketplace-wide figure)
export const IMPACT = {
  co2Kg: 128404,
  rehomed: 41208,
  waterL: 96500000,
};
