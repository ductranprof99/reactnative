import { View, Image, Text, StyleSheet } from "react-native";
import { CategoryModel } from "@/models/CategoryModel";

export interface CategoryItemProps {
    item: CategoryModel;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => (
    <View style={styles.categoryItem}>
        <Image source={item.image} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
    </View>
);

const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    categoryName: {
        marginTop: 5,
        fontSize: 12,
    },
});
