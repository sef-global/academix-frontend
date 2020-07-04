export interface SingleRoute {
  path: string;
  exact: boolean;
  component: any;
  routes?: SingleRoute[];
}

export interface SubCategory {
  id: number;
  name: string;
  translations: SubCategoryTranslation[];
}

export interface SubCategoryTranslation {
  name: string;
  language: string;
}

export interface Category {
  id: number;
  translations: CategoryTranslation[];
}

export interface CategoryTranslation {
  name: string;
  language: string;
}
