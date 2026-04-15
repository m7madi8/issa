import { useSyncExternalStore } from 'react';

/**
 * يتزامن مع matchMedia بدون وميض أول إطار (مقارنة بـ useState + useEffect).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
