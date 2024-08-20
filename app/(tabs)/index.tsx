import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, FlatList, ScrollView, StyleSheet, SafeAreaView, ViewToken } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Make sure to install expo-vector-icons
import { CategoryIndicator } from '@/components/home/CategoryIndicator';
import { CategoryItem } from '@/components/home/CategoryItem';
import { RecommendedItemModel, recommendedItems } from '@/models/RecommendModel';
import { CategoryModel, categories } from '@/models/CategoryModel';

const HomeScreen: React.FC = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentCategoryIndex(viewableItems[0].index || 0);
    }
  });
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
