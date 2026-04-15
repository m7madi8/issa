import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Button as HeroUIButton } from '@heroui/react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

type ButtonProps =
  | ({
      href: string;
    } & AnchorHTMLAttributes<HTMLAnchorElement> & {
        variant?: 'primary' | 'secondary' | 'ghost';
      })
  | ({
      href?: undefined;
    } & ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: 'primary' | 'secondary' | 'ghost';
      });

type BadgeProps = {
  children: ReactNode;
  tone?: 'light' | 'dark';
};

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return <div className={`container ${narrow ? 'container--narrow' : ''} ${className}`}>{children}</div>;
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  if ('href' in props && props.href) {
    const href = props.href;
    const { href: _href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const heroVariant: 'bordered' = 'bordered';
    const heroColor = (variant === 'secondary' || variant === 'ghost' ? 'default' : 'primary') as
      | 'primary'
      | 'default';
    return (
      <HeroUIButton href={href} variant={heroVariant} color={heroColor} className={className} {...anchorProps}>
        {children}
      </HeroUIButton>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  const heroVariant: 'bordered' = 'bordered';
  const heroColor = (variant === 'secondary' || variant === 'ghost' ? 'default' : 'primary') as
    | 'primary'
    | 'default';
  return (
    <HeroUIButton variant={heroVariant} color={heroColor} className={className} {...buttonProps}>
      {children}
    </HeroUIButton>
  );
}

export function Badge({ children, tone = 'light' }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function Panel({ children, className = '' }: PanelProps) {
  return <div className={`panel ${className}`.trim()}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  alignment = 'left',
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  alignment?: 'left' | 'center';
}) {
  return (
    <div className={`section-heading section-heading--${alignment}`}>
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading__title">{title}</h2>
      {body ? <p className="section-heading__body">{body}</p> : null}
    </div>
  );
}
