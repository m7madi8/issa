import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

export type StaggeredSocialItem = {
  label: string;
  link: string;
};

type StaggeredMenuProps = {
  position?: 'left' | 'right';
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

export default function StaggeredMenu({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#e11d2e',
  accentColor = '#e11d2e',
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const offscreen = useMemo(() => (position === 'left' ? -100 : 100), [position]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const trigger = triggerRef.current;
    const icon = iconRef.current;
    if (!panel || !trigger || !icon) return;

    gsap.set(panel, { xPercent: offscreen });
    if (overlay) gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
    gsap.set(trigger, { color: menuButtonColor });
  }, [menuButtonColor, offscreen]);

  const setClosedState = useCallback(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const icon = iconRef.current;
    if (!panel || !icon) return;

    const contentTargets = Array.from(
      panel.querySelectorAll('.lux-menu__itemLabel, .lux-menu__socialLink, .lux-menu__sectionTitle')
    ) as HTMLElement[];

    gsap.killTweensOf([panel, overlay, icon, ...contentTargets]);
    if (overlay) gsap.to(overlay, { autoAlpha: 0, duration: 0.2, ease: 'power2.out' });
    gsap.to(panel, { xPercent: offscreen, duration: 0.42, ease: 'power3.inOut' });
    gsap.to(icon, { rotate: 0, duration: 0.3, ease: 'power2.out' });
    gsap.set(contentTargets, { y: 18, opacity: 0, rotate: 6 });
    if (triggerRef.current) gsap.set(triggerRef.current, { color: menuButtonColor });
  }, [menuButtonColor, offscreen]);

  const openMenu = useCallback(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const trigger = triggerRef.current;
    const icon = iconRef.current;
    if (!panel || !trigger || !icon) return;

    const itemTargets = Array.from(panel.querySelectorAll('.lux-menu__itemLabel')) as HTMLElement[];
    const socialTargets = Array.from(panel.querySelectorAll('.lux-menu__socialLink')) as HTMLElement[];
    const titleTargets = Array.from(panel.querySelectorAll('.lux-menu__sectionTitle')) as HTMLElement[];

    gsap.killTweensOf([panel, overlay, icon, ...itemTargets, ...socialTargets, ...titleTargets]);
    gsap.set(panel, { xPercent: offscreen });
    gsap.set([...itemTargets, ...socialTargets, ...titleTargets], { y: 18, opacity: 0, rotate: 6 });
    if (overlay) gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(icon, { rotate: 0 });
    gsap.set(trigger, { color: menuButtonColor });

    if (overlay) gsap.to(overlay, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' });
    gsap.to(panel, { xPercent: 0, duration: 0.82, ease: 'power4.out' });
    gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out' });
    gsap.to(trigger, {
      color: changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
      duration: 0.25,
      ease: 'power2.out',
    });
    gsap.to(titleTargets, {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.04,
      delay: 0.1,
    });
    gsap.to(itemTargets, {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.85,
      ease: 'power4.out',
      stagger: 0.06,
      delay: 0.12,
    });
    gsap.to(socialTargets, {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 0.22,
    });
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor, offscreen]);

  const closeMenu = useCallback(() => {
    setClosedState();
  }, [setClosedState]);

  const handleItemClick = useCallback(
    (_event: MouseEvent<HTMLAnchorElement>) => {
      if (!open) return;

      setOpen(false);
      onMenuClose?.();
      closeMenu();
    },
    [closeMenu, onMenuClose, open]
  );

  const toggleMenu = useCallback(() => {
    setOpen((current) => {
      const next = !current;
      if (next) {
        onMenuOpen?.();
        openMenu();
      } else {
        onMenuClose?.();
        closeMenu();
      }
      return next;
    });
  }, [closeMenu, onMenuClose, onMenuOpen, openMenu]);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousHtmlOverflow = html.style.overflow;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    // If Lenis smooth scrolling is active, pause it to prevent background scroll.
    // (Lenis keeps updating via RAF, so overflow hidden alone may not fully stop motion.)
    (window as any).__lenisStop?.();
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      html.style.overflow = previousHtmlOverflow;

      (window as any).__lenisStart?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnClickAway) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        onMenuClose?.();
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMenu, closeOnClickAway, open, onMenuClose]);

  return (
    <div
      className={['lux-menu', className, isFixed ? 'lux-menu--fixed' : ''].filter(Boolean).join(' ')}
      data-position={position}
      data-open={open || undefined}
      style={{ '--lux-accent': accentColor } as CSSProperties & { '--lux-accent': string }}
    >
      <button
        ref={triggerRef}
        className="lux-menu__trigger"
        type="button"
        aria-expanded={open}
        aria-controls="lux-menu-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={toggleMenu}
      >
        <span className="lux-menu__triggerLabel" aria-hidden="true">
          {open ? 'Close' : 'Menu'}
        </span>
        <span className="lux-menu__icon" ref={iconRef} aria-hidden="true">
          <span className="lux-menu__line lux-menu__line--horizontal" />
          <span className="lux-menu__line lux-menu__line--vertical" />
        </span>
      </button>

      <button
        ref={overlayRef}
        type="button"
        className="lux-menu__overlay"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => {
          if (!closeOnClickAway) return;
          setOpen(false);
          onMenuClose?.();
          closeMenu();
        }}
      />

      <aside id="lux-menu-panel" ref={panelRef} className="lux-menu__panel" aria-hidden={!open}>
        <div className="lux-menu__panelInner">
          <div className="lux-menu__brand">
            {logoUrl ? <img src={logoUrl} alt="" aria-hidden="true" className="lux-menu__logo" /> : null}
            <span className="lux-menu__sectionTitle">Premium navigation</span>
          </div>

          <ul className="lux-menu__list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items.length ? (
              items.map((item, index) => (
                <li key={`${item.label}-${index}`} className="lux-menu__itemWrap">
                  <a
                    className="lux-menu__item"
                    href={item.link}
                    aria-label={item.ariaLabel}
                    data-index={index + 1}
                    onClick={handleItemClick}
                  >
                    <span className="lux-menu__itemLabel">{item.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="lux-menu__itemWrap">
                <span className="lux-menu__item" aria-hidden="true">
                  <span className="lux-menu__itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems.length > 0 ? (
            <div className="lux-menu__socials">
              <h3 className="lux-menu__sectionTitle">Instagram</h3>
              <ul className="lux-menu__socialList" role="list">
                {socialItems.map((item, index) => (
                  <li key={`${item.label}-${index}`} className="lux-menu__socialItem">
                    <a
                      className="lux-menu__socialLink"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleItemClick}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
