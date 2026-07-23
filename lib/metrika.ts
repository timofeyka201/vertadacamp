export const YANDEX_METRIKA_ID = 110307995;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function reachGoal(target: string): void {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(YANDEX_METRIKA_ID, "reachGoal", target);
  }
}
