/**
 * مصدر واحد لأصناف المشروبات الساخنة.
 * الترتيب = ترتيب التمرير في قسم الرزمة.
 */
export type HotDrinkItem = {
  id: string;
  title: string;
  subtitle: string;
  /** عرض للمستخدم بالدولار (مثال: "$4.99" — السنتان تُعرض بالأحمر في الواجهة) */
  price: string;
  /** مسار من جذر الموقع (public) */
  imageSrc: string;
  /** اسم بأحرف كبيرة في رف الكاروسيل (اختياري) */
  shelfTitle?: string;
  /** لون القوس خلف المنتج في وضع التركيز */
  arcColor?: string;
};

const cup = (file: string) => `/img/${encodeURIComponent(file)}`;

export const HOT_DRINK_ITEMS: readonly HotDrinkItem[] = [
  {
    id: 'strawmilk',
    title: 'Strawmilk',
    shelfTitle: 'STRAWMILK',
    subtitle: 'Strawberry milkshake',
    price: '$11.00',
    arcColor: '#e8486a',
    imageSrc: cup('Chocolate Freeze.png'),
  },
  {
    id: 'chocoffee',
    title: 'Chocoffee',
    shelfTitle: 'CHOCOFFEE',
    subtitle: 'Chocolate coffee shake',
    price: '$11.00',
    arcColor: '#4a3228',
    imageSrc: cup('Chocolate Freeze.png'),
  },
  {
    id: 'banhoney',
    title: 'Banhoney',
    shelfTitle: 'BANHONEY',
    subtitle: 'Banana & honey',
    price: '$11.00',
    arcColor: '#e8c84d',
    imageSrc: cup('Chocolate Freeze.png'),
  },
];
