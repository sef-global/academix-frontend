import { Category, SubCategory } from '../../interfaces';

export interface SubCategoryStateProps {
  subCategories: SubCategory[];
  category: Category | null;
}

export interface CategoryUrlParams {
  categoryId: string;
}
