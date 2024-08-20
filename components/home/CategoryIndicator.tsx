import { CategoryModel } from "@/models/CategoryModel";
import { View, StyleSheet } from "react-native";

interface CategoryIndicatorProps {
    categories: CategoryModel[];
    currentIndex: number;
}

export const CategoryIndicator: React.FC<CategoryIndicatorProps> = ({ categories, currentIndex }) => (
    <View style={styles.indicatorContainer}>
        {categories.map((_, index) => (
            <View
                key={index}
                style={[
                    styles.indicator,
                    index === currentIndex ? styles.activeIndicator : null,
                ]}
            />
        ))}
    </View>
);

const styles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    indicator: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: '#000',
    },
});