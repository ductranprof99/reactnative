import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CategoryModel } from "@/models/CategoryModel";

export interface CategoryItemProps {
    item: CategoryModel;
    onTap: (item: CategoryModel) => void
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ item, onTap }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => onTap(item)}>
        <Image src={item.image} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
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
