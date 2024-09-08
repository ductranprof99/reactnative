export interface FoodModel {
    id: string;
    name: string;
    price: number;
    description: string;
    isRecommend: boolean;
    image: any; 
    category: string;
}

export interface SelectedItem extends FoodModel {
    quantity: number;
}