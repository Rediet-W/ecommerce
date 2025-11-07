export const APP_CONFIG = {
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
  debounce: {
    search: 300,
  },
  features: {
    enableDarkMode: true,
    enableSearch: true,
  },
} as const;
