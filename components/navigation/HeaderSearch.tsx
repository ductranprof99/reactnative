import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import { router } from 'expo-router';

interface HeaderSearchProps {
    onSearchChange?: (text: string) => void;
    onCartPress?: () => void;
    onMenuPress?: () => void;
    onPush?: Boolean;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({
    onSearchChange,
    onCartPress,
    onMenuPress,
    onPush
}) => {
    const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";
    return (
        <View style={styles.header}>
            {
                (onPush !== undefined || onPush === true) ?
                    <Ionicons
                        name={backIcon}
                        size={25}
                        color="black"
                        onPress={() => router.back()}
                    />
                    :
                    <></>
            }
            <View style={styles.searchBar}>
                <Feather name="search" size={20} color="#888" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm"
                    placeholderTextColor="#888"
                    onChangeText={onSearchChange}
                />
            </View>
            <Feather
                name="shopping-cart"
                size={24}
                color="#000"
                style={styles.icon}
                onPress={onCartPress}
            />
            <Feather
                name="menu"
                size={24}
                color="#000"
                style={styles.icon}
                onPress={onMenuPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 16,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        marginLeft: 8,
    },
    icon: {
        marginLeft: 16,
    },
});

export default HeaderSearch;