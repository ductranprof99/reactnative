import { FoodModel } from "@/models/FoodModel";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { RecommendedItem } from "./RecommendItem";

interface RecommendListProps {
    listFood: FoodModel[];
    onTap: (item: FoodModel) => void;
}

export const RecommendedPaging: React.FC<RecommendListProps> = ({ listFood, onTap }) => {
    const ref = useRef<FlatList>(null)
    const [index, setIndex] = useState(0)
    useEffect(() => {
        if (listFood.length > 0) {
            ref.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5,
            })
        }
    }, [index])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList 
                data={listFood}
                ref={ref}
                initialScrollIndex={index}
                pagingEnabled
                renderItem={({ item }) => <RecommendedItem item={item} onTap={onTap} />}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ padding: 0 }}
            />
        </View>
    );
}