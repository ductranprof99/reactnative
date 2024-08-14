import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { View, Text, TextInput, Image, FlatList, ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Make sure to install expo-vector-icons

interface Category {
  id: string;
  name: string;
  image: any; // Using 'any' for simplicity, but you might want to use a more specific type
}

interface RecommendedItem {
  id: string;
  name: string;
  price: string;
  description: string;
  address: string;
  image: any; // Using 'any' for simplicity
}

const categories: Category[] = [
  { id: '1', name: 'Bún phở', image: require('../../assets/demo/bunpho.png') },
  { id: '2', name: 'Bánh mỳ', image: require('../../assets/demo/banhmy.png') },
  { id: '3', name: 'Bánh mỳ', image: require('../../assets/demo/banhmy.png') },
  { id: '4', name: 'Bánh mỳ', image: require('../../assets/demo/banhmy.png') },
];

const recommendedItems: RecommendedItem[] = [
  { 
    id: '1', 
    name: 'Gà rán hàn quốc', 
    price: '30,000đ', 
    description: 'Gà rán hàn quốc tương ớt siêu cay', 
    address: '101 Xuân Thủy, P.Thảo Điền', 
    image: require('../../assets/demo/bunpho.png') 
  },
  // ... add more items as needed
];

const CategoryItem: React.FC<{ item: Category }> = ({ item }) => (
  <View style={styles.categoryItem}>
    <Image source={item.image} style={styles.categoryImage} />
    <Text style={styles.categoryName}>{item.name}</Text>
  </View>
);
const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#888"
          />
        </View>
        <Feather name="shopping-cart" size={24} color="#000" style={styles.icon} />
        <Feather name="menu" size={24} color="#000" style={styles.icon} />
      </View>

      <ScrollView>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />

        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedTitle}>Có thể bạn thích</Text>
          {/* <FlatList
            data={recommendedItems}
            renderItem={({ item }) => <RecommendedItem item={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  recommendedSection: {
    padding: 10,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendedItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  recommendedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  recommendedInfo: {
    flex: 1,
  },
  recommendedName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendedPrice: {
    fontSize: 14,
    color: '#ff6600',
    marginTop: 2,
  },
  recommendedDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  recommendedAddress: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});

export default HomeScreen;
