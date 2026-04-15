import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ShimmerButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

type ShimmerButtonProps =
  | ({
      href: string;
    } & ShimmerButtonBaseProps &
      AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined;
    } & ShimmerButtonBaseProps &
      ButtonHTMLAttributes<HTMLButtonElement>);

export function ShimmerButton(props: ShimmerButtonProps) {
  const { children, className = '', variant = 'primary', ...rest } = props;
  const classes = `button button--${variant} shimmer-button ${className}`.trim();

  const content = (
    <>
      <span className="shimmer-button__shine" aria-hidden="true" />
      <span className="shimmer-button__content">{children}</span>
    </>
  );

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
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
