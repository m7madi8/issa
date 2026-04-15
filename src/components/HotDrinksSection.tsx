import { memo, useId } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { HOT_DRINK_ITEMS, type HotDrinkItem } from '../data/hotDrinksCatalog';
import FocalParallaxShelf from './focal-shelf/FocalParallaxShelf';
import './HotDrinksSection.css';

export type { HotDrinkItem };

export type HotDrinksSectionProps = {
  items?: readonly HotDrinkItem[];
  className?: string;
};

/** يطابق منطق السعر: "$4.99" → أسود حتى النقطة + "99" أحمر */
function StaticDrinkPrice({ price }: { price: string }) {
  const t = price.trim();
  const m = t.match(/^(.*\.)(\d{2})$/);
  if (!m) {
    return (
      <p className="hot-drinks-static__price" aria-label={`Price ${price}`}>
        {price}
      </p>
    );
  }
  return (
    <p className="hot-drinks-static__price" aria-label={`Price ${price}`}>
      <span className="hot-drinks-static__price-main">{m[1]}</span>
      <span className="hot-drinks-static__price-cents">{m[2]}</span>
    </p>
  );
}

/** تقليل الحركة: قائمة بسيطة */
function HotDrinksStatic({
  items,
  className,
  uid,
}: {
  items: readonly HotDrinkItem[];
  className: string;
  uid: string;
}) {
  return (
    <section className={`hot-drinks hot-drinks--static ${className}`.trim()} aria-label="Hot drinks">
      <div className="hot-drinks-static__list">
        {items.map((item) => (
          <article key={item.id} className="hot-drinks-static__card" data-drink-id={item.id}>
            <header className="hot-drinks-static__head">
              <h2 id={`${uid}-${item.id}`} className="hot-drinks-static__title">
                {item.title}
              </h2>
              <p className="hot-drinks-static__subtitle">{item.subtitle}</p>
              <StaticDrinkPrice price={item.price} />
            </header>
            <div className="hot-drinks-static__visual">
              <div className="hot-drinks-static__shadow" aria-hidden="true" />
              <img
                className="hot-drinks-static__cup"
                src={item.imageSrc}
                alt=""
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HotDrinksSectionInner({
  items = HOT_DRINK_ITEMS,
  className = '',
}: HotDrinksSectionProps) {
  const uid = useId();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (reduceMotion) {
    return <HotDrinksStatic items={items} className={className} uid={uid} />;
  }

  return (
    <section className={`hot-drinks hot-drinks--carousel ${className}`.trim()} aria-label="Product shelf carousel">
      <div className="hot-drinks-carousel__intro">
        <p className="hot-drinks-carousel__eyebrow">99 Cafe</p>
        <h2 className="hot-drinks-carousel__heading">Focal parallax shelf</h2>
        <p className="hot-drinks-carousel__lead">
          Swipe horizontally — the center product stays sharp while neighbors peek in soft focus.
        </p>
      </div>

      <div className="hot-drinks-carousel__shelf-wrap">
        <FocalParallaxShelf items={items} />
      </div>
    </section>
  );
}

const HotDrinksSection = memo(HotDrinksSectionInner);
export default HotDrinksSection;
