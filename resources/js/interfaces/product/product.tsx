import { Category } from '../category/category';

export interface Product {
    id: number;
    name: string;
    minimumUnit: number;
    unitPrice: number;
    unitWeight: number;
    categoryId: number;
    status: number;
    category: Category;
    productImage: string;
    description: string;
}
