/** Stock photography for menu UI — swap URLs for `/img/...` when assets are ready. */

const q = (photoId: string, w = 900) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=82`;

/** Wide cover per menu subsection (sections). */
export const MENU_SECTION_COVER: Record<string, string> = {
  'classic-hot-coffee': q('1497935586351-b67a49e012bf', 1200),
  'classic-cold-coffee': q('1517701604599-bb29b565ddc9', 1200),
  'tea-selection': q('1556670353-727469921fd0', 1200),
  signature: q('1461023058943-07fcbe16d735', 1200),
  'matcha-creations': q('1515825830400-b7b94c1493b2', 1200),
  'chocolate-lovers': q('1549007993681-39bf7b7e4b9c', 1200),
  'freeze-favorites': q('1572497627529-f999207185d6', 1200),
  coolers: q('1544145945-f26b4d26a866', 1200),
  'in-house-freshers': q('1622597433679-1b12b207e6f2', 1200),
  'organic-lemonade': q('1523671716835-ea97125f8f1a', 1200),
  cheesecake: q('1533134242443-e4db4c2da6db', 1200),
  'san-sebastian': q('1565958011703-44f9ebae7158', 1200),
  muffin: q('1607958428629-420b9957a8d5', 1200),
  cookies: q('1499636136213-30da3d849794', 1200),
  'velvet-squares': q('1578985545062-69928b564d94', 1200),
  'bakery-bites': q('1509440155356-02429a19ebb7', 1200),
  'toast-salad': q('1541519223315-6fa2631c01d6', 1200),
  'acai-bowl': q('1590304352618-6f1c0a8c0b0a', 1200),
  'sugar-free-99': q('1509042239860-f550ce710b93', 1200),
  'protein-shakes-99': q('1572497627529-f999207185d6', 1200),
  'energy-boost-99': q('1546172999-15d967fcacc9', 1200),
};

/** Hub card hero for Drinks tab (`public/img/drimks.png`). */
export const MENU_DRINKS_HUB_IMAGE = '/img/drimks.png';

/** Hub card hero for Desserts tab (`public/img/desserts.png`). */
export const MENU_DESSERTS_HUB_IMAGE = '/img/desserts.png';

/** Hub card hero for Food tab (`public/img/food.png`). */
export const MENU_FOOD_HUB_IMAGE = '/img/food.png';

/** Hub card hero for Healthy tab (`public/img/healthy.png`). */
export const MENU_HEALTHY_HUB_IMAGE = '/img/healthy.png';

export const MENU_MAIN_TAB_IMAGE: Record<string, string> = {
  drinks: MENU_DRINKS_HUB_IMAGE,
  desserts: MENU_DESSERTS_HUB_IMAGE,
  food: MENU_FOOD_HUB_IMAGE,
  healthy: MENU_HEALTHY_HUB_IMAGE,
};

/** Generic drinks fallback (e.g. unknown section). */
export const MENU_DRINKS_ALL_COVER = q('1442512595331-e89e73853f31', 1400);

/** Drinks filter rail “All” — local hub art (avoids broken remote thumbnails). */
export const MENU_DRINKS_FILTER_ALL_COVER = MENU_DRINKS_HUB_IMAGE;

export function getAllFilterCover(mainTab: 'drinks' | 'desserts' | 'food' | 'healthy'): string {
  if (mainTab === 'drinks') return MENU_DRINKS_FILTER_ALL_COVER;
  return MENU_MAIN_TAB_IMAGE[mainTab];
}

const DRINK_IMG_DIR = '/img/drinks';
const CAKE_IMG_DIR = '/img/cake';
const FOOD_IMG_DIR = '/img/food';

/** Encode filename for URL (spaces, accents, `&`, e.g. Crème, Sebastián). */
function drinkAsset(filename: string): string {
  return `${DRINK_IMG_DIR}/${encodeURIComponent(filename)}`;
}

function cakeAsset(filename: string): string {
  return `${CAKE_IMG_DIR}/${encodeURIComponent(filename)}`;
}

function foodAsset(filename: string): string {
  return `${FOOD_IMG_DIR}/${encodeURIComponent(filename)}`;
}

/**
 * Local drink photos — filenames must match `public/img/drinks/` exactly.
 * Items not listed here keep `MENU_ITEM_IMAGE` (Unsplash) until you add a file.
 */
export const MENU_DRINK_LOCAL_IMAGE: Record<string, string> = {
  espresso: drinkAsset('Espresso.png'),
  americano: drinkAsset('Americano.png'),
  cappuccino: drinkAsset('Cappuccino.png'),
  latte: drinkAsset('Latte.webp'),
  cortado: drinkAsset('Cortado.png'),
  'iced-americano': drinkAsset('Iced Americano.webp'),
  'iced-latte': drinkAsset('Iced Latte.webp'),
  'iced-mocha': drinkAsset('Iced Mocha.png'),
  'iced-tea': drinkAsset('Iced Tea.webp'),
  'unsweetened-iced-tea': drinkAsset('Unsweetened Iced Tea.webp'),
  '99-signature-latte': drinkAsset('99 Signature Latte.png'),
  'creme-banana-latte': drinkAsset('Crème de Banana Latte.webp'),
  'cloudy-brown-sugar-cinnamon': drinkAsset('Cloudy Brown Sugar Cinnamon.webp'),
  'classic-matcha': drinkAsset('Classic Matcha.webp'),
  'honey-bees-matcha': drinkAsset('Honey Bees Matcha.webp'),
  'strawberry-matcha': drinkAsset('Strawberry Matcha.webp'),
  'premium-hot-chocolate': drinkAsset('Premium Hot Chocolate.webp'),
  'classic-coffee-freeze': drinkAsset('Classic Coffee Freeze.webp'),
  'chocolate-freeze': drinkAsset('Chocolate Freeze.webp'),
  'caramel-crunch-freeze': drinkAsset('Caramel Crunch Freeze.webp'),
  'pumpkin-pie-freeze': drinkAsset('Pumpkin Pie Freeze.png'),
  'strawberry-freeze': drinkAsset('Strawberry Freeze.webp'),
  'mango-freeze': drinkAsset('Mango Freeze.webp'),
  'strawberry-dragon-fruit': drinkAsset('Strawberry Dragon Fruit.png'),
  tango: drinkAsset('Tango.png'),
  hawaiian: drinkAsset('Hawaiian.png'),
  'pina-colada': drinkAsset('Pina Colada.png'),
  'fresh-orange': drinkAsset('Fresh Orange.webp'),
  'fresh-apple': drinkAsset('Fresh Apple.webp'),
  'fresh-carrot': drinkAsset('Fresh Carrot.webp'),
  lemonade: drinkAsset('Lemonade.webp'),
  'strawberry-lemonade': drinkAsset('Strawberry Lemonade.webp'),
  /** Also used on Healthy tab — file lives in `drinks/`. */
  'raspberry-energy': drinkAsset('Raspberry Energy.webp'),
};

/**
 * Filter-rail hero per **drinks** subsection — local files in `public/img/drinks/`
 * (representative drink for each category).
 */
export const MENU_DRINK_SECTION_RAIL_IMAGE: Record<string, string> = {
  'classic-hot-coffee': drinkAsset('Latte.webp'),
  'classic-cold-coffee': drinkAsset('Iced Latte.webp'),
  'tea-selection': drinkAsset('Iced Tea.webp'),
  signature: drinkAsset('99 Signature Latte.png'),
  'matcha-creations': drinkAsset('Classic Matcha.webp'),
  'chocolate-lovers': drinkAsset('Premium Hot Chocolate.webp'),
  'freeze-favorites': drinkAsset('Classic Coffee Freeze.webp'),
  coolers: drinkAsset('Strawberry Dragon Fruit.png'),
  'in-house-freshers': drinkAsset('Fresh Orange.webp'),
  'organic-lemonade': drinkAsset('Lemonade.webp'),
};

/**
 * Filter-rail hero per **desserts** subsection — `public/img/cake/`.
 */
export const MENU_DESSERT_SECTION_RAIL_IMAGE: Record<string, string> = {
  cheesecake: cakeAsset('Dulce le che cheesecake.webp'),
  'san-sebastian': cakeAsset('Matcha San Sebastián.webp'),
  muffin: cakeAsset('Blueberry Crumb Muffins.png'),
  cookies: cakeAsset('Double chocolate cookie.webp'),
  'velvet-squares': cakeAsset('Flourless Midnight Velvet Mousse.webp'),
};

/**
 * Filter-rail hero per **food** subsection — `public/img/food/`.
 */
export const MENU_FOOD_SECTION_RAIL_IMAGE: Record<string, string> = {
  'bakery-bites': foodAsset('Morning Egg Bun.webp'),
  'toast-salad': foodAsset('signature-egg-toast.webp'),
  'acai-bowl': foodAsset('Original Acai Bowl.webp'),
};

/**
 * Filter-rail hero per **healthy** subsection — assets in `public/img/drinks/`.
 */
export const MENU_HEALTHY_SECTION_RAIL_IMAGE: Record<string, string> = {
  'sugar-free-99': drinkAsset('Unsweetened Iced Tea.webp'),
  'protein-shakes-99': drinkAsset('Chocolate Freeze.webp'),
  'energy-boost-99': drinkAsset('Raspberry Energy.webp'),
};

/**
 * Local dessert / cake photos — filenames match `public/img/cake/` exactly.
 * Some on-disk names differ slightly from menu labels (typos in source files).
 */
export const MENU_CAKE_LOCAL_IMAGE: Record<string, string> = {
  'blueberry-crumb-muffins': cakeAsset('Blueberry Crumb Muffins.png'),
  /** On-disk typo: "Choccolate Crumb Muffins" — only chocolate muffin asset in folder. */
  'chocolate-chip-muffin': cakeAsset('Choccolate Crumb Muffins.png'),
  'double-chocolate-cookie': cakeAsset('Double chocolate cookie.webp'),
  /** On-disk typo: "Dulce le che cheesecake". */
  'dulce-cheesecake': cakeAsset('Dulce le che cheesecake.webp'),
  'golden-praline-cheesecake': cakeAsset('Golden praline cheesecake.webp'),
  /** Menu "Lemon Cheesecake" — file uses "Lemon&wild bluberry cheesecake". */
  'lemon-cheesecake': cakeAsset('Lemon&wild bluberry cheesecake.webp'),
  'matcha-san-sebastian': cakeAsset('Matcha San Sebastián.webp'),
  'nutella-san-sebastian': cakeAsset('Nutella San Sebastián.webp'),
  'vanilla-san-sebastian': cakeAsset('Vanilla San Sebastián.webp'),
  'flourless-midnight-velvet-mousse': cakeAsset('Flourless Midnight Velvet Mousse.webp'),
  'raspberry-crumb': cakeAsset('Raspberry Crumb.webp'),
  'seasonal-gingerbread-cookie': cakeAsset('Seasonal Gingerbread Cookie.webp'),
};

/**
 * Local food photos — prefer Title Case filenames that match item names; slug duplicates exist for some.
 * `creamy-avocado-toast` has no asset in `public/img/food/` yet.
 */
export const MENU_FOOD_LOCAL_IMAGE: Record<string, string> = {
  'morning-egg-bun': foodAsset('Morning Egg Bun.webp'),
  'turkey-sausage-cheese': foodAsset('Turkey Sausage & Cheese.png'),
  'apple-spice-bites': foodAsset('Apple Spice Bites.webp'),
  'signature-egg-toast': foodAsset('signature-egg-toast.webp'),
  'tuna-toast': foodAsset('Tuna Toast.png'),
  'crunchy-caesar-salad': foodAsset('Crunchy Caesar Salad.png'),
  'zesty-tuna-salad': foodAsset('Zesty Tuna Salad.webp'),
  'original-acai-bowl': foodAsset('Original Acai Bowl.webp'),
};

/** Per-item hero shots (each SKU has its own card image). */
export const MENU_ITEM_IMAGE: Record<string, string> = {
  espresso: q('1510591509098-f4fdc6d0ff04'),
  americano: q('1511920170389-7b365b90c5a0'),
  cappuccino: q('1572442388796-9aafe9980f0c'),
  latte: q('1561882468-9110e03e0f78'),
  cortado: q('1485808191679-5fe865aaea3d'),
  mocha: q('1572497627529-f999207185d6'),
  'iced-americano': q('1461023058943-07fcbe16d735'),
  'iced-latte': q('1517701604599-bb29b565ddc9'),
  'iced-mocha': q('1572497627529-f999207185d6'),
  'iced-tea': q('1556670353-727469921fd0'),
  'unsweetened-iced-tea': q('1523671716835-ea97125f8f1a'),
  'hot-tea': q('1544787219-7f408ccbffa8'),
  '99-signature-latte': q('1495474476917-cd15857e8a2a'),
  'creme-banana-latte': q('1509042239860-f550ce710b93'),
  'midnight-pistachio-latte': q('1515825830400-b7b94c1493b2'),
  'cloudy-brown-sugar-cinnamon': q('1509042239860-f550ce710b93'),
  'classic-matcha': q('1515825830400-b7b94c1493b2'),
  'honey-bees-matcha': q('1582794548138-25bade6f7e1e'),
  '99-signature-matcha': q('1515823063375-982783955c21'),
  'strawberry-matcha': q('1556670353-727469921fd0'),
  'banana-velvet-matcha': q('1572497627529-f999207185d6'),
  'tropical-velvet-matcha': q('1544145945-f26b4d26a866'),
  'premium-hot-chocolate': q('1549007993681-39bf7b7e4b9c'),
  'white-hot-chocolate': q('1514516876427-34d6da2d0b14'),
  'dark-hot-chocolate': q('1511920170389-7b365b90c5a0'),
  'nutella-chocolate': q('1606313564200-75d6e6bebf9f'),
  'salted-caramel-chocolate': q('1481391314166-c3171b16cf34'),
  'classic-coffee-freeze': q('1572497627529-f999207185d6'),
  'chocolate-freeze': q('1572497627529-f999207185d6'),
  'caramel-crunch-freeze': q('1488472122083-2a2f1a0c0b8a'),
  'pumpkin-pie-freeze': q('1504754524776-8f4f37790ca0'),
  'strawberry-freeze': q('1556670353-727469921fd0'),
  'mango-freeze': q('1544145945-f26b4d26a866'),
  'crunch-biscoff-freeze': q('1606313564200-75d6e6bebf9f'),
  'strawberry-dragon-fruit': q('1544145945-f26b4d26a866'),
  tango: q('1546172999-15d967fcacc9'),
  hawaiian: q('1544145945-f26b4d26a866'),
  'pina-colada': q('1534351590666-13e3e96fb504'),
  'fresh-orange': q('1622597433679-1b12b207e6f2'),
  'fresh-apple': q('1568707047890-6e2f2f8f9b8a'),
  'fresh-carrot': q('1598170849887-040e134d2f4a'),
  greenie: q('1610975225340-79ce7dd88eae'),
  lemonade: q('1523671716835-ea97125f8f1a'),
  'strawberry-lemonade': q('1556670353-727469921fd0'),
  'dulce-cheesecake': q('1533134242443-e4db4c2da6db'),
  'golden-praline-cheesecake': q('1565958011703-44f9ebae7158'),
  'lemon-cheesecake': q('1524351199678-941a58a3c26e'),
  'matcha-san-sebastian': q('1515825830400-b7b94c1493b2'),
  'nutella-san-sebastian': q('1606313564200-75d6e6bebf9f'),
  'vanilla-san-sebastian': q('1565958011703-44f9ebae7158'),
  'blueberry-crumb-muffins': q('1607958428629-420b9957a8d5'),
  'chocolate-chip-muffin': q('1607958428629-420b9957a8d5'),
  'double-chocolate-cookie': q('1499636136213-30da3d849794'),
  'seasonal-gingerbread-cookie': q('1481391314166-c3171b16cf34'),
  'flourless-midnight-velvet-mousse': q('1578985545062-69928b564d94'),
  'raspberry-crumb': q('1565958011703-44f9ebae7158'),
  'morning-egg-bun': q('1509440155356-02429a19ebb7'),
  'turkey-sausage-cheese': q('1528735602780-2552fd46c7af'),
  'apple-spice-bites': q('1504754524776-8f4f37790ca0'),
  'creamy-avocado-toast': q('1541519223315-6fa2631c01d6'),
  'signature-egg-toast': q('1525351484163-7529144344d8'),
  'tuna-toast': q('1546069901-ba9599a7e63c'),
  'crunchy-caesar-salad': q('1512621776951-a57141f2eefd'),
  'zesty-tuna-salad': q('1546069901-ba9599a7e63c'),
  'original-acai-bowl': q('1590304352618-6f1c0a8c0b0a'),
  'caramel-latte-sugar-free': q('1561882468-9110e03e0f78'),
  'salted-caramel-latte-sugar-free': q('1481391314166-c3171b16cf34'),
  'french-latte-sugar-free': q('1495474476917-cd15857e8a2a'),
  'pina-colada-cooler-sugar-free': q('1534351590666-13e3e96fb504'),
  'iced-tea-peach-sugar-free': q('1556670353-727469921fd0'),
  'watermelon-energy-sugar-free': q('1544145945-f26b4d26a866'),
  'peach-energy-sugar-free': q('1556670353-727469921fd0'),
  'vanilla-protein-shake': q('1572497627529-f999207185d6'),
  'chocolate-protein-shake': q('1606313564200-75d6e6bebf9f'),
  'banana-butter-protein-shake': q('1509042239860-f550ce710b93'),
  'raspberry-energy': q('1546172999-15d967fcacc9'),
  'watermelon-energy': q('1544145945-f26b4d26a866'),
  'peach-energy': q('1556670353-727469921fd0'),
};

export function getItemImage(itemId: string): string {
  const local =
    MENU_DRINK_LOCAL_IMAGE[itemId] ??
    MENU_CAKE_LOCAL_IMAGE[itemId] ??
    MENU_FOOD_LOCAL_IMAGE[itemId];
  if (local) return local;
  return MENU_ITEM_IMAGE[itemId] ?? q('1442512595331-e89e73853f31');
}

export function getSectionCover(sectionId: string): string {
  return (
    MENU_DRINK_SECTION_RAIL_IMAGE[sectionId] ??
    MENU_DESSERT_SECTION_RAIL_IMAGE[sectionId] ??
    MENU_FOOD_SECTION_RAIL_IMAGE[sectionId] ??
    MENU_HEALTHY_SECTION_RAIL_IMAGE[sectionId] ??
    MENU_SECTION_COVER[sectionId] ??
    MENU_DRINKS_ALL_COVER
  );
}
