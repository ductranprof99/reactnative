export interface FoodModel {
    id: string;
    name: string;
    price: number;
    description: string;
    isRecommend: boolean;
    image: any; 
    category: string;
}

export const recommendedItems: FoodModel[] = [
    {
        id: '1',
        name: 'Gà rán hàn quốc',
        price: 30000,
        description: 'Gà rán hàn quốc tương ớt siêu cay',
        image: require('../assets/demo/bunpho.png'),
        category: "chicken",
        isRecommend: false
    },
    {
        id: '2',
        name: 'Gà rán hàn quốc',
        price: 30000,
        description: 'Gà rán hàn quốc tương ớt siêu cay',
        image: require('../assets/demo/bunpho.png'),
        category: "chicken",
        isRecommend: false
    },
    // ... add more items as needed
];

export const testCategoryItem: FoodModel[] = [
    {
        id: '1',
        name: 'Gà rán hàn quốc',
        price: 30000,
        description: 'Gà rán hàn quốc tương ớt siêu cay',
        image: require('../assets/demo/bunpho.png'),
        category: "chicken",
        isRecommend: false
    },
    {
        id: '2',
        name: 'Gà rán hàn quốc',
        price: 30000,
        description: 'Gà rán hàn quốc tương ớt siêu cay',
        image: require('../assets/demo/bunpho.png'),
        category: "chicken",
        isRecommend: false
    },
    // ... add more items as needed
];