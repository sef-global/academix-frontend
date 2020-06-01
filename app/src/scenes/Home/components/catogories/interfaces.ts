export interface CategoryStateProps {
  categories: Category[];
}

export interface Category {
  id: number;
  translations: CategoryTranslation[];
}

export interface CategoryTranslation {
  name: string;
  language: string;
}
