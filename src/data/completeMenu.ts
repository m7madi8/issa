/** Full 99 Cafe menu — source of truth for /menu */

export type PriceSizes = {
  mini?: number;
  normal?: number;
  maxi?: number;
};

export type PriceTierKey = 'mini' | 'normal' | 'maxi';

export type PriceTier = {
  key: PriceTierKey;
  label: string;
  amount: number;
};

/** Ordered tiers for UI (Mini → Normal → Maxi) — only defined prices. */
export function getPriceTiers(prices: PriceSizes): PriceTier[] {
  const out: PriceTier[] = [];
  if (prices.mini != null) out.push({ key: 'mini', label: 'MINI', amount: prices.mini });
  if (prices.normal != null) out.push({ key: 'normal', label: 'NORMAL', amount: prices.normal });
  if (prices.maxi != null) out.push({ key: 'maxi', label: 'MAXI', amount: prices.maxi });
  return out;
}

export type MenuLineItem = {
  id: string;
  name: string;
  /** Flavors, pairing text, or extra pricing notes */
  notes?: string;
  prices: PriceSizes;
  /** Optional override; default resolved in UI via `getItemImage(id)` */
  image?: string;
};

export type MenuSubsection = {
  id: string;
  title: string;
  items: MenuLineItem[];
  /** Optional override; default `getSectionCover(id)` in UI */
  image?: string;
};

export type MainMenuTabId = 'drinks' | 'desserts' | 'food' | 'healthy';

export type MainMenuTab = {
  id: MainMenuTabId;
  title: string;
  description: string;
};

export const MAIN_MENU_TABS: MainMenuTab[] = [
  {
    id: 'drinks',
    title: 'Drinks',
    description: 'Coffee, tea, matcha & more',
  },
  {
    id: 'desserts',
    title: 'Desserts',
    description: 'Cheesecake, bakes, cookies',
  },
  {
    id: 'food',
    title: 'Food',
    description: 'Toast, salads, bowls',
  },
  {
    id: 'healthy',
    title: 'Healthy',
    description: 'Sugar free, protein & energy',
  },
];

export const DRINK_SUBFILTER_ALL = 'all' as const;

export const DRINK_SUBSECTIONS: MenuSubsection[] = [
  {
    id: 'classic-hot-coffee',
    title: '99 Classic Hot Coffee',
    items: [
      { id: 'espresso', name: 'Espresso', prices: { mini: 3.99 } },
      { id: 'americano', name: 'Americano', prices: { mini: 3.99, normal: 4.99, maxi: 5.99 } },
      { id: 'cappuccino', name: 'Cappuccino', prices: { mini: 4.99, normal: 5.99, maxi: 6.99 } },
      { id: 'latte', name: 'Latte', prices: { mini: 4.99, normal: 5.99, maxi: 6.99 } },
      { id: 'cortado', name: 'Cortado', prices: { mini: 3.99, normal: 4.99, maxi: 5.99 } },
      { id: 'mocha', name: 'Mocha', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
    ],
  },
  {
    id: 'classic-cold-coffee',
    title: '99 Classic Cold Coffee',
    items: [
      { id: 'iced-americano', name: 'Iced Americano', prices: { mini: 4.99, normal: 5.99, maxi: 6.99 } },
      { id: 'iced-latte', name: 'Iced Latte', prices: { mini: 4.99, normal: 5.99, maxi: 6.99 } },
      { id: 'iced-mocha', name: 'Iced Mocha', prices: { mini: 6.99, normal: 7.99, maxi: 8.99 } },
    ],
  },
  {
    id: 'tea-selection',
    title: '99 Tea Selection',
    items: [
      {
        id: 'iced-tea',
        name: 'Iced Tea',
        notes: 'Peach, Passion, Classic',
        prices: { mini: 3.99, normal: 4.99, maxi: 5.99 },
      },
      {
        id: 'unsweetened-iced-tea',
        name: 'Unsweetened Iced Tea',
        prices: { mini: 3.99, normal: 4.99, maxi: 5.99 },
      },
      {
        id: 'hot-tea',
        name: 'Hot Tea',
        notes: 'Green Tea, Classic, Spiced Apple Chai',
        prices: { mini: 3.99, normal: 4.99 },
      },
    ],
  },
  {
    id: 'signature',
    title: '99 Signature',
    items: [
      { id: '99-signature-latte', name: '99 Signature Latte', prices: { mini: 6.99, normal: 7.99, maxi: 8.99 } },
      { id: 'creme-banana-latte', name: 'Crème de Banana Latte', prices: { mini: 6.99, normal: 7.99, maxi: 8.99 } },
      {
        id: 'midnight-pistachio-latte',
        name: 'Midnight Pistachio Latte',
        prices: { mini: 6.99, normal: 7.99, maxi: 8.99 },
      },
      {
        id: 'cloudy-brown-sugar-cinnamon',
        name: 'Cloudy Brown Sugar Cinnamon',
        prices: { mini: 6.99, normal: 7.99, maxi: 8.99 },
      },
    ],
  },
  {
    id: 'matcha-creations',
    title: '99 Matcha Creations',
    items: [
      { id: 'classic-matcha', name: 'Classic Matcha', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      { id: 'honey-bees-matcha', name: 'Honey Bees Matcha', prices: { mini: 6.99, normal: 7.99, maxi: 8.99 } },
      { id: '99-signature-matcha', name: '99 Signature Matcha', prices: { mini: 7.99, normal: 8.99, maxi: 9.99 } },
      { id: 'strawberry-matcha', name: 'Strawberry Matcha', prices: { mini: 6.99, normal: 7.99, maxi: 8.99 } },
      { id: 'banana-velvet-matcha', name: 'Banana Velvet Matcha', prices: { mini: 6.99, normal: 7.99, maxi: 8.99 } },
      {
        id: 'tropical-velvet-matcha',
        name: 'Tropical Velvet Matcha',
        prices: { mini: 5.99, normal: 7.99, maxi: 8.99 },
      },
    ],
  },
  {
    id: 'chocolate-lovers',
    title: '99 Chocolate Lovers',
    items: [
      { id: 'premium-hot-chocolate', name: 'Premium Hot Chocolate', prices: { mini: 5.99, normal: 6.99 } },
      { id: 'white-hot-chocolate', name: 'White Hot Chocolate', prices: { mini: 4.99, normal: 5.99 } },
      { id: 'dark-hot-chocolate', name: 'Dark Hot Chocolate', prices: { mini: 4.99, normal: 5.99 } },
      { id: 'nutella-chocolate', name: 'Nutella Chocolate', prices: { mini: 4.99, normal: 5.99 } },
      { id: 'salted-caramel-chocolate', name: 'Salted Caramel Chocolate', prices: { mini: 4.99, normal: 5.99 } },
    ],
  },
  {
    id: 'freeze-favorites',
    title: '99 Freeze Favorites',
    items: [
      {
        id: 'classic-coffee-freeze',
        name: 'Classic Coffee Freeze',
        prices: { mini: 4.99, normal: 5.99, maxi: 6.99 },
      },
      { id: 'chocolate-freeze', name: 'Chocolate Freeze', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      { id: 'caramel-crunch-freeze', name: 'Caramel Crunch Freeze', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      { id: 'pumpkin-pie-freeze', name: 'Pumpkin Pie Freeze', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      { id: 'strawberry-freeze', name: 'Strawberry Freeze', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      { id: 'mango-freeze', name: 'Mango Freeze', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      { id: 'crunch-biscoff-freeze', name: 'Crunch Biscoff Freeze', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
    ],
  },
  {
    id: 'coolers',
    title: '99 Coolers',
    items: [
      {
        id: 'strawberry-dragon-fruit',
        name: 'Strawberry Dragon Fruit',
        prices: { mini: 4.99, normal: 5.99, maxi: 6.99 },
      },
      { id: 'tango', name: 'Tango', notes: 'Apple · Kiwi', prices: { mini: 4.99, normal: 5.99, maxi: 6.99 } },
      {
        id: 'hawaiian',
        name: 'Hawaiian',
        notes: 'Pineapple · Blue Curaçao',
        prices: { mini: 4.99, normal: 5.99, maxi: 6.99 },
      },
      {
        id: 'pina-colada',
        name: 'Pina Colada',
        notes: 'Pineapple · Coconut',
        prices: { mini: 4.99, normal: 5.99, maxi: 6.99 },
      },
    ],
  },
  {
    id: 'in-house-freshers',
    title: '99 In-House Freshers',
    items: [
      { id: 'fresh-orange', name: 'Fresh Orange', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      { id: 'fresh-apple', name: 'Fresh Apple', prices: { mini: 6.99, normal: 7.99, maxi: 8.99 } },
      { id: 'fresh-carrot', name: 'Fresh Carrot', prices: { mini: 5.99, normal: 6.99, maxi: 7.99 } },
      {
        id: 'greenie',
        name: 'Greenie',
        notes: 'Apple, Cucumber, Lemon & Honey',
        prices: { mini: 7.99, normal: 8.99, maxi: 9.99 },
      },
    ],
  },
  {
    id: 'organic-lemonade',
    title: '99 Organic Lemonade',
    items: [
      { id: 'lemonade', name: 'Lemonade', prices: { mini: 4.99, normal: 5.99, maxi: 6.99 } },
      { id: 'strawberry-lemonade', name: 'Strawberry Lemonade', prices: { mini: 4.99, normal: 5.99, maxi: 6.99 } },
    ],
  },
];

export const DRINK_FILTER_OPTIONS: { id: typeof DRINK_SUBFILTER_ALL | string; label: string }[] = [
  { id: DRINK_SUBFILTER_ALL, label: 'All' },
  { id: 'classic-hot-coffee', label: '99 Classic Hot Coffee' },
  { id: 'classic-cold-coffee', label: '99 Classic Cold Coffee' },
  { id: 'tea-selection', label: '99 Tea Selection' },
  { id: 'signature', label: '99 Signature' },
  { id: 'matcha-creations', label: '99 Matcha Creations' },
  { id: 'chocolate-lovers', label: '99 Chocolate Lovers' },
  { id: 'freeze-favorites', label: '99 Freeze Favorites' },
  { id: 'coolers', label: '99 Coolers' },
  { id: 'in-house-freshers', label: '99 In-House Freshers' },
  { id: 'organic-lemonade', label: '99 Organic Lemonade' },
];

export const DESSERT_SUBFILTER_ALL = 'all';

export const DESSERT_SECTIONS: MenuSubsection[] = [
  {
    id: 'cheesecake',
    title: 'Cheesecake',
    items: [
      { id: 'dulce-cheesecake', name: 'Dulce Cheesecake', prices: { mini: 8.99 } },
      { id: 'golden-praline-cheesecake', name: 'Golden Praline Cheesecake', prices: { mini: 8.99 } },
      { id: 'lemon-cheesecake', name: 'Lemon Cheesecake', prices: { mini: 8.99 } },
    ],
  },
  {
    id: 'san-sebastian',
    title: 'San Sebastian',
    items: [
      { id: 'matcha-san-sebastian', name: 'Matcha San Sebastian', prices: { mini: 9.99 } },
      { id: 'nutella-san-sebastian', name: 'Nutella San Sebastian', prices: { mini: 9.99 } },
      { id: 'vanilla-san-sebastian', name: 'Vanilla San Sebastian', prices: { mini: 9.99 } },
    ],
  },
  {
    id: 'muffin',
    title: 'Muffin',
    items: [
      { id: 'blueberry-crumb-muffins', name: 'Blueberry Crumb Muffins', prices: { mini: 4.99 } },
      { id: 'chocolate-chip-muffin', name: 'Chocolate Chip Muffin', prices: { mini: 4.99 } },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    items: [
      { id: 'double-chocolate-cookie', name: 'Double Chocolate Cookie', prices: { mini: 3.99 } },
      { id: 'seasonal-gingerbread-cookie', name: 'Seasonal Gingerbread Cookie', prices: { mini: 3.99 } },
    ],
  },
  {
    id: 'velvet-squares',
    title: 'Velvet Squares',
    items: [
      {
        id: 'flourless-midnight-velvet-mousse',
        name: 'Flourless Midnight Velvet Mousse',
        prices: { mini: 5.99 },
      },
      { id: 'raspberry-crumb', name: 'Raspberry Crumb', prices: { mini: 4.99 } },
    ],
  },
];

export const DESSERT_FILTER_OPTIONS: { id: string; label: string }[] = [
  { id: DESSERT_SUBFILTER_ALL, label: 'All' },
  { id: 'cheesecake', label: 'Cheesecake' },
  { id: 'san-sebastian', label: 'San Sebastian' },
  { id: 'muffin', label: 'Muffin' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'velvet-squares', label: 'Velvet Squares' },
];

export const FOOD_SUBFILTER_ALL = 'all';

export const FOOD_SECTIONS: MenuSubsection[] = [
  {
    id: 'bakery-bites',
    title: 'Bakery Bites',
    items: [
      { id: 'morning-egg-bun', name: 'Morning Egg Bun', prices: { mini: 7.99 } },
      { id: 'turkey-sausage-cheese', name: 'Turkey Sausage & Cheese', prices: { mini: 7.99 } },
      { id: 'apple-spice-bites', name: 'Apple Spice Bites', prices: { mini: 7.99 } },
    ],
  },
  {
    id: 'toast-salad',
    title: '99 Toast & Salad',
    items: [
      { id: 'creamy-avocado-toast', name: 'Creamy Avocado Toast', prices: { mini: 8.99 } },
      { id: 'signature-egg-toast', name: 'Signature Egg Toast', prices: { mini: 8.99 } },
      { id: 'tuna-toast', name: 'Tuna Toast', prices: { mini: 9.99 } },
      { id: 'crunchy-caesar-salad', name: 'Crunchy Caesar Salad', prices: { mini: 8.99 } },
      { id: 'zesty-tuna-salad', name: 'Zesty Tuna Salad', prices: { mini: 10.99 } },
    ],
  },
  {
    id: 'acai-bowl',
    title: 'Acai Bowl',
    items: [
      {
        id: 'original-acai-bowl',
        name: 'Original Acai Bowl',
        notes:
          'Toppings (included): Classic Granola, Strawberry, Banana, Blueberry. Add-ons (+$0.99 each): Nutella, Peanut Butter, Biscoff, Honey.',
        prices: { mini: 9.99, normal: 12.99 },
      },
    ],
  },
];

export const FOOD_FILTER_OPTIONS: { id: string; label: string }[] = [
  { id: FOOD_SUBFILTER_ALL, label: 'All' },
  { id: 'bakery-bites', label: 'Bakery Bites' },
  { id: 'toast-salad', label: '99 Toast & Salad' },
  { id: 'acai-bowl', label: 'Acai Bowl' },
];

export const HEALTHY_SUBFILTER_ALL = 'all';

export const HEALTHY_SECTIONS: MenuSubsection[] = [
  {
    id: 'sugar-free-99',
    title: '99 Sugar Free',
    items: [
      {
        id: 'caramel-latte-sugar-free',
        name: 'Caramel Latte (Sugar Free)',
        prices: { mini: 5.99, normal: 6.99, maxi: 7.99 },
      },
      {
        id: 'salted-caramel-latte-sugar-free',
        name: 'Salted Caramel Latte (Sugar Free)',
        prices: { mini: 5.99, normal: 6.99, maxi: 7.99 },
      },
      {
        id: 'french-latte-sugar-free',
        name: 'French Latte (Sugar Free)',
        prices: { mini: 6.99, normal: 7.99, maxi: 8.99 },
      },
      {
        id: 'pina-colada-cooler-sugar-free',
        name: 'Pina Colada Cooler (Sugar Free)',
        prices: { mini: 4.99, normal: 5.99, maxi: 6.99 },
      },
      {
        id: 'iced-tea-peach-sugar-free',
        name: 'Iced Tea Peach (Sugar Free)',
        prices: { mini: 3.99, normal: 4.99, maxi: 5.99 },
      },
      {
        id: 'watermelon-energy-sugar-free',
        name: 'Watermelon Energy (Sugar Free)',
        prices: { mini: 7.99, normal: 8.99, maxi: 9.99 },
      },
      {
        id: 'peach-energy-sugar-free',
        name: 'Peach Energy (Sugar Free)',
        prices: { mini: 7.99, normal: 8.99, maxi: 9.99 },
      },
    ],
  },
  {
    id: 'protein-shakes-99',
    title: '99 Protein Shakes',
    items: [
      { id: 'vanilla-protein-shake', name: 'Vanilla Protein Shake', prices: { maxi: 8.99 } },
      { id: 'chocolate-protein-shake', name: 'Chocolate Protein Shake', prices: { maxi: 8.99 } },
      { id: 'banana-butter-protein-shake', name: 'Banana Butter Protein Shake', prices: { maxi: 9.99 } },
    ],
  },
  {
    id: 'energy-boost-99',
    title: '99 Energy Boost',
    items: [
      {
        id: 'raspberry-energy',
        name: 'Raspberry Energy',
        prices: { mini: 7.99, normal: 8.99, maxi: 9.99 },
      },
      {
        id: 'watermelon-energy',
        name: 'Watermelon Energy',
        prices: { mini: 7.99, normal: 8.99, maxi: 9.99 },
      },
      {
        id: 'peach-energy',
        name: 'Peach Energy',
        prices: { mini: 7.99, normal: 8.99, maxi: 9.99 },
      },
    ],
  },
];

export const HEALTHY_FILTER_OPTIONS: { id: string; label: string }[] = [
  { id: HEALTHY_SUBFILTER_ALL, label: 'All' },
  { id: 'sugar-free-99', label: '99 Sugar Free' },
  { id: 'protein-shakes-99', label: '99 Protein Shakes' },
  { id: 'energy-boost-99', label: '99 Energy Boost' },
];

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatPriceSizes(p: PriceSizes): string {
  const parts: string[] = [];
  if (p.mini != null) parts.push(`Mini ${formatUsd(p.mini)}`);
  if (p.normal != null) parts.push(`Normal ${formatUsd(p.normal)}`);
  if (p.maxi != null) parts.push(`Maxi ${formatUsd(p.maxi)}`);
  return parts.join(' · ');
}

/** Single-tier items (e.g. desserts) show plain price; multi-tier shows Mini / Normal / Maxi. */
export function formatItemPrice(p: PriceSizes): string {
  const tiers = [p.mini, p.normal, p.maxi].filter((n) => n != null).length;
  if (tiers === 1 && p.mini != null) return formatUsd(p.mini);
  return formatPriceSizes(p);
}
