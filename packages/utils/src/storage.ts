const hasWindow = (): boolean => typeof window !== "undefined";

const safeParse = <T>(raw: string | null): T | null => {
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const createStore = (read: () => Storage | null) => ({
  get<T>(key: string): T | null {
    const s = read();
    if (!s) return null;
    return safeParse<T>(s.getItem(key));
  },

  set<T>(key: string, value: T): void {
    const s = read();
    if (!s) return;
    s.setItem(key, JSON.stringify(value));
  },

  remove(key: string): void {
    const s = read();
    if (!s) return;
    s.removeItem(key);
  },

  clear(): void {
    const s = read();
    if (!s) return;
    s.clear();
  },
});

export const localStore = createStore(() => (hasWindow() ? window.localStorage : null));

export const sessionStore = createStore(() => (hasWindow() ? window.sessionStorage : null));
