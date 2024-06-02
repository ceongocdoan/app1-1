import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const sampleRestaurants = [
  { id: 1, image: require('../assets/haidilao.jpg'), name: 'Haidilao', address: '123' },
  { id: 2, image: require('../assets/gogi.png'), name: 'Gogi', address: '234' },
  { id: 3, image: require('../assets/dookki.jpg'), name: 'Dookki', address: '567' },
];

const Finding = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = (text) => {
    const filtered = sampleRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchText(text);
    setFilteredRestaurants(filtered);
  };

  const handleRestaurantDetail = (restaurant) => {
    console.log('Thông tin chi tiết của nhà hàng:', restaurant);
  };

  const handleEnterPress = () => {
    if (filteredRestaurants.length > 0) {
      handleRestaurantDetail(filteredRestaurants[0]); 
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <TextInput
        style={{ padding: 10, margin: 10, borderWidth: 1, borderColor: '#ccc' }}
        placeholder="Tìm kiếm nhà hàng..."
        value={searchText}
        onChangeText={handleSearch}
        onSubmitEditing={handleEnterPress}
      />

      <FlatList
        data={filteredRestaurants}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRestaurantDetail(item)}>
            <View style={styles.restaurantContainer}>
              <ImageBackground source={item.image} style={styles.imageBackground}>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.address}>{item.address}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  imageBackground: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  textContainer: {
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 5,
    marginLeft: 10, 
  },
  name: {
    fontWeight: 'bold',
    color: 'white',
  },
  address: {
    color: 'white',
  },
});

export default Finding;
