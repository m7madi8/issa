/** عتبة السحب (بكسل) لاعتبار الانتقال مكتملاً */
export const PULL_THRESHOLD = 100;

/** أقصى إزاحة أثناء السحب/العجلة (يمنع بقاء الواجهة “عالقة”) */
export const PULL_CLAMP = Math.round(PULL_THRESHOLD * 1.08);

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function easeOutCubic(t: number): number {
  const x = clamp01(t);
  return 1 - (1 - x) ** 3;
}

export function easeOutQuart(t: number): number {
  const x = clamp01(t);
  return 1 - (1 - x) ** 4;
}

/** منحنى ناعم للتركيز البصري (smoothstep خفيف) */
export function focusCurve(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function clampPull(v: number): number {
  return Math.max(-PULL_CLAMP, Math.min(PULL_CLAMP, v));
}

/** تقدّم خام نحو الصنف التالي (0…1) */
export function progressNext(pull: number): number {
  if (pull >= 0) return 0;
  return Math.min(1, -pull / PULL_THRESHOLD);
}

/** تقدّم خام نحو الصنف السابق (0…1) */
export function progressPrev(pull: number): number {
  if (pull <= 0) return 0;
  return Math.min(1, pull / PULL_THRESHOLD);
}

/** تقدّم مُنعَّم للعرض (blur / scale / قوس) */
export function blendNext(pull: number): number {
  return focusCurve(progressNext(pull));
}

export function blendPrev(pull: number): number {
  return focusCurve(progressPrev(pull));
}

export function shouldCommitNext(pull: number): boolean {
  return pull < -PULL_THRESHOLD * 0.3;
}

export function shouldCommitPrev(pull: number): boolean {
  return pull > PULL_THRESHOLD * 0.3;
}

export function splitPriceForDisplay(price: string): { main: string; cents: string } {
  const t = price.trim();
  const m = t.match(/^(.*\.)(\d{2})$/);
  if (m) return { main: m[1], cents: m[2] };
  return { main: t, cents: '' };
}
