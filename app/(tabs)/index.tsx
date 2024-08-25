import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, FlatList, ScrollView, StyleSheet, ViewToken } from 'react-native';
import { CategoryIndicator } from '@/components/home/CategoryIndicator';
import { CategoryItem } from '@/components/home/CategoryItem';
import { RecommendedItem } from '@/components/home/RecommendItem';
import { FoodModel, recommendedItems } from '@/models/FoodModel';
import { CategoryModel, categories } from '@/models/CategoryModel';
import { FoodItem } from '@/components/home/FoodItem';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
	const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

	const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
		if (viewableItems.length > 0) {
			setCurrentCategoryIndex(viewableItems[0].index || 0);
		}
	});

	const handleSearchChange = (text: string) => {
		console.log('Search text:', text);
		// Implement your search logic here
	};

	const handleCartPress = () => {
		console.log('Cart pressed');
		// Navigate to cart or open cart modal
	};

	const handleMenuPress = () => {
		console.log('Menu pressed');
		// Open menu or navigate as needed
	};

	return (
		<MainViewFrame
			onSearchChange={handleSearchChange}
			onCartPress={handleCartPress}
			onMenuPress={handleMenuPress}
		>
			<View>


				<ScrollView>
					<View>
						<FlatList
							data={categories}
							renderItem={({ item }) => <CategoryItem item={item} />}
							keyExtractor={(item) => item.id}
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.categoriesList}
							onViewableItemsChanged={onViewableItemsChanged.current}
							viewabilityConfig={viewabilityConfig.current}
						/>
						<CategoryIndicator
							categories={categories}
							currentIndex={currentCategoryIndex}
						/>
					</View>
					<View style={styles.scrollVerticalSection}>
						<Text style={styles.sectionTitle}>Có thể bạn thích</Text>
						<FlatList
							data={recommendedItems}
							renderItem={({ item }) => <RecommendedItem item={item} />}
							keyExtractor={(item) => item.id}
							horizontal
							pagingEnabled
							centerContent
							showsHorizontalScrollIndicator={false}
							snapToAlignment="center"
							decelerationRate="fast"
							snapToInterval={width}
							contentContainerStyle={styles.flatListContent}
							ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
							getItemLayout={(data, index) => ({
								length: width,
								offset: width * index,
								index,
							})}
						/>
					</View>
					<View style={styles.scrollVerticalSection}>
						<Text style={styles.sectionTitle}>Món ăn thường ngày</Text>
						<FlatList
							data={recommendedItems}
							renderItem={({ item }) => <FoodItem item={item} />}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
						/>
					</View>
				</ScrollView>
			</View>
		</MainViewFrame>

	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	searchBar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		borderRadius: 20,
		paddingHorizontal: 10,
	},
	searchInput: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 5,
	},
	icon: {
		marginLeft: 15,
	},
	categoriesList: {
		paddingVertical: 10,
	},

	scrollVerticalSection: {
		padding: 10,
	},
	flatListContent: {
		paddingHorizontal: 8, // Half of the item's horizontal margin
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
		paddingHorizontal: 16,
	},

});

export default HomeScreen;
