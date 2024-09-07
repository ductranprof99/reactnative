import { FoodModel } from "./FoodModel";

export interface CartItemModel extends FoodModel {
    quantity: number;
}