export type LuxuryCategory = {
  id: string;
  title: string;
  tagline: string;
  /** CSS linear-gradient for card backdrop */
  gradient: string;
  image: string;
  cta: string;
};

/**
 * Remote photography — replace `image` with `/img/...` when you have brand assets.
 */
export const luxuryMenuCategories: LuxuryCategory[] = [
  {
    id: 'coffee',
    title: 'Coffee',
    tagline: 'Espresso to pour-over',
    gradient: 'linear-gradient(165deg, #2c2438 0%, #4a3f55 42%, #6b5d6e 100%)',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=85',
    cta: 'View drinks',
  },
  {
    id: 'pastry',
    title: 'Pastries',
    tagline: 'Baked in-house daily',
    gradient: 'linear-gradient(165deg, #3d2f28 0%, #5c4a42 45%, #7d6a5c 100%)',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
    cta: 'See selection',
  },
  {
    id: 'sandwich',
    title: 'Sandwiches',
    tagline: 'Fresh & balanced',
    gradient: 'linear-gradient(165deg, #252a32 0%, #3d4550 48%, #5a6570 100%)',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85',
    cta: 'Explore flavors',
  },
  {
    id: 'cold',
    title: 'Cold drinks',
    tagline: 'Iced & refreshed',
    gradient: 'linear-gradient(165deg, #1e2d3a 0%, #2f4555 50%, #4a6b7c 100%)',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565ddc9?auto=format&fit=crop&w=900&q=85',
    cta: 'Cool down',
  },
];
