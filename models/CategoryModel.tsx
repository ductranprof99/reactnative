export interface CategoryModel {
    id: string;
    name: string;
    image: any; // Consider using a more specific type if possible
}

export const categories: CategoryModel[] = [
    { id: '1', name: 'Bún phở', image: require('../assets/demo/bunpho.png') },
    { id: '2', name: 'Bánh mỳ', image: require('../assets/demo/banhmy.png') },
    { id: '3', name: 'Bánh mỳ', image: require('../assets/demo/banhmy.png') },
    { id: '4', name: 'Bánh mỳ', image: require('../assets/demo/banhmy.png') },
    { id: '5', name: 'Bánh mỳ', image: require('../assets/demo/banhmy.png') },
    { id: '6', name: 'Bánh mỳ', image: require('../assets/demo/banhmy.png') },
];