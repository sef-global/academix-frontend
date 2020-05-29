export interface CategoryStateProps {
  categories: Category[];
}

export interface Category {
  id: number;
  translations: {
    en: {
      name: string,
    },
    si?: {
      name: string,
    },
    ta?: {
      name: string,
    },
  };
}
