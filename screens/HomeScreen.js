import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const images = [
    require('../assets/dookki.jpg'),
    require('../assets/gogi.png'),
    require('../assets/haidilao.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderImage = ({ item }) => (
    <Image source={item} style={styles.image} resizeMode="cover" />
  );

  const BookingIcon = <Icon name="calendar" size={24} color="green" />;
const RestaurantIcon = <FontAwesome5 name="map-marker-alt" size={24} color="green" />
const CallFoodIcon = <Icon name="phone" size={24} color="green" />;
const MarketIcon = <Icon name="shopping-cart" size={24} color="green" />;

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
    <Text>{BookingIcon} Đặt Bàn</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Finding')}>
    <Text>{RestaurantIcon} Tìm Nhà Hàng</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Call')}>
    <Text>{CallFoodIcon} Gọi Đồ Ăn</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Shopping')}>
    <Text>{MarketIcon} Đi Chợ</Text>
  </TouchableOpacity>
</View>

      <View style={styles.carouselContainer}>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.floor(
              event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
            );
            setCurrentImageIndex(slideIndex);
          }}
        />
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentImageIndex ? styles.paginationDotActive : null,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.offersContainer}>
        <Text style={styles.header}>Ưu Đãi</Text>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '900px',
    height: '300px',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: '#333',
  },
  offersContainer: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
