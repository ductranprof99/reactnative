export interface FoodModel {
    id: string;
    name: string;
    price: string;
    description: string;
    address: string;
    image: any; // Consider using a more specific type if possible
}

export const recommendedItems: FoodModel[] = [
    {
        id: '1',
        name: 'Gà rán hàn quốc',
        price: '30,000đ',
        description: 'Gà rán hàn quốc tương ớt siêu cay',
        address: '101 Xuân Thủy, P.Thảo Điền',
        image: require('../assets/demo/bunpho.png')
    },
    // ... add more items as needed
];