import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, FlatList, ScrollView, StyleSheet, ViewToken, NativeScrollEvent } from 'react-native';
import { CategoryIndicator } from '@/components/home/CategoryIndicator';
import { CategoryItem } from '@/components/home/CategoryItem';
import { FoodModel } from '@/models/FoodModel';
import { CategoryModel } from '@/models/CategoryModel';
import { FoodItem } from '@/components/home/FoodItem';
import { MainViewFrame } from '@/components/navigation/MainViewFrame';
import { router } from 'expo-router';
import { getBatchFood, getCategory, getRecommendFood } from '@/services/api';
const { width } = Dimensions.get('window');
import { RecommendedPaging } from '@/components/home/RecommendPaging';
import { useSnackBars } from '@/components/utils/snack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/services/firebase';
interface HomeScreenData {
	categories: CategoryModel[];
	recommends: FoodModel[];
	foods: FoodModel[];
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
	const paddingToBottom = 20;
	return layoutMeasurement.height + contentOffset.y >=
		contentSize.height - paddingToBottom;
};

const fetchAllData = async () => {
	try {
		const [categories, recommendedFoods, batchedFoods] = await Promise.all([
			getCategory(),
			getRecommendFood(),
			getBatchFood()
		]);
		return { categories, recommendedFoods, batchedFoods };
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error; // Re-throw the error if you want calling code to handle it
	}
};


const HomeScreen: React.FC = () => {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
	const [homeCategory, setHomeCategory] = useState<CategoryModel[]>([]);
	const [homeRecommendFood, setHomeRecommendFood] = useState<FoodModel[]>([]);
	const [homeFoods, setHomeFood] = useState<FoodModel[]>([]);
	const [user, setUser] = useState<User | null>(null)

	const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 1 });
	const { addAlert } = useSnackBars();

	useEffect(() => {
		onAuthStateChanged(FIREBASE_AUTH, (user) => {
			setUser(user)
		})
		fetchAllData()
			.then(data => {
				setHomeCategory(data.categories)
				setHomeRecommendFood(data.recommendedFoods)
				setHomeFood(data.batchedFoods)
			})
			.catch(error => {
				console.error('Failed to fetch data:', error);
			});
	}, []);

	const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
		if (viewableItems.length > 0) {
			setCurrentCategoryIndex(viewableItems[0].index || 0);
		}
	});

	const loadMoreNormalProduct = async () => {
		let lasted_product_name = homeFoods[homeFoods.length - 1].name
		const req = getBatchFood(lasted_product_name)
		req.then((listFood) => {
			setHomeFood(homeFoods.concat(listFood))
			// console.log(homeFoods.concat(listFood))
		}).catch((error) => {
			console.log(error)
			addAlert("Không thể load thêm product")
		})
	}

	const handleSearchChange = (text: string) => {
		console.log('Search text:', text);
		// Implement your search logic here
	};

	const handleCartPress = () => {
		if (user !== null) {
			router.push('/layout/cartscreen')
		} else {
			router.push('/(tabs)/account')
		}
	};

	const handleOnTapCategory = (item: CategoryModel) => {
		router.push({ pathname: `/helper/category/[id]`, params: { id: item.catId, banner: item.banner, categoryName: item.name } });
	}

	const handleOnTapProduct = (item: FoodModel) => {
		router.push({ pathname: `/helper/product/[id]`, params: { id: item.id } });
	}

	return (
		<MainViewFrame
			onSearchChange={handleSearchChange}
			onCartPress={handleCartPress}
		>
			<View>
				<ScrollView
					onMomentumScrollEnd={({nativeEvent}) => {
						if (isCloseToBottom(nativeEvent)) {
							loadMoreNormalProduct()
						}
					} }
				>
					<View>
						<FlatList
							data={homeCategory}
							renderItem={({ item }) => <CategoryItem item={item} onTap={handleOnTapCategory} />}
							keyExtractor={(item) => item.id}
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.categoriesList}
							onViewableItemsChanged={onViewableItemsChanged.current}
							viewabilityConfig={viewabilityConfig.current}
						/>
						<CategoryIndicator
							categories={homeCategory}
							currentIndex={currentCategoryIndex}
						/>
					</View>
					<View style={styles.scrollVerticalSection}>
						<Text style={styles.sectionTitle}>Có thể bạn thích</Text>
						<RecommendedPaging listFood={homeRecommendFood} onTap={handleOnTapProduct} />
					</View>
					<View style={styles.scrollVerticalSection}>
						<Text style={styles.sectionTitle}>Món ăn thường ngày</Text>
						<FlatList
							data={homeFoods}
							renderItem={({ item }) => <FoodItem item={item} onTap={handleOnTapProduct}  />}
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
