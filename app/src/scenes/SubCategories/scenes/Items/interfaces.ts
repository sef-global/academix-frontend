export interface ItemStateProps {
  items: Item[];
  isLoading: boolean;
  isModalVisible: boolean;
  selectedItem: Item | null;
  pagination: {
    current: number,
    pageSize: number,
    total: number,
  };
}

export interface Item {
  id: number;
  link: string;
  translations: ItemTranslation[];
}

export interface ItemTranslation {
  name: string;
  language: string;
  description: string;
}

export interface ItemPayload {
  content: Item[];
  totalElements: number;
}

export interface ItemUrlParams {
  subCategoryId: string;
}

export interface ItemProps {
  setCurrent: (subCategoryId: string) => void;
}
