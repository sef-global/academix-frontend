import { Category, SubCategory } from '../../interfaces';

export interface SubCategoryStateProps {
  subCategories: SubCategory[];
  category: Category | null;
  current: string;
}

export interface CategoryUrlParams {
  categoryId: string;
}
