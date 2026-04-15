import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type HeroUIButtonBaseProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  variant?: string;
};

type HeroUIButtonProps =
  | ({
      href: string;
    } & HeroUIButtonBaseProps &
      AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined;
    } & HeroUIButtonBaseProps &
      ButtonHTMLAttributes<HTMLButtonElement>);

export function Button(props: HeroUIButtonProps) {
  const {
    children,
    className = '',
    color = 'default',
    variant = 'bordered',
    ...rest
  } = props;
  const classes = [
    'button',
    'hero-ui-button',
    `button--${variant}`,
    `hero-ui-button--${variant}`,
    `button--${color}`,
    `hero-ui-button--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const content = <span className="hero-ui-button__label">{children}</span>;

  if ('href' in props && props.href) {
    const href = props.href;
    const { href: _href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
