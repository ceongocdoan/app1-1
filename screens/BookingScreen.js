import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Picker, ImageBackground } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const BookingScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('Hà Nội');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTime, setSelectedTime] = useState('10:30');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const cityIcon = <FontAwesome name="map-marker" size={24} color="black" />
  const brandIcon = <MaterialIcons name="branding-watermark" size={24} color="black" />
  const timeIcon = <MaterialIcons name="access-time" size={24} color="black" />

  const cities = [
    { label: ' Hà Nội', value: 'Hà Nội' },
    {label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
    {label: 'Đà Nẵng', value: 'Đà Nẵng' }
  ];

  const brands = [
    { name: 'Gogi House - Quán thịt nướng Hàn Quốc' },
    { name: 'GoGi Steak' },
    { name: 'Kichi-Kichi - Lẩu băng chuyền'}
  ];

  const times = [
    '9:00', '9:30','10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  useEffect(() => {
    if (selectedBrand && selectedTime) {
      setLoading(true);
      fetchRestaurants(selectedCity, selectedBrand, selectedTime)
        .then((data) => {
          setRestaurants(data); 
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Error fetching restaurants:', error);
          setLoading(false); 
        });
    }
  }, [selectedBrand, selectedTime]);

  const fetchRestaurants = async (city, brand, time) => {
    try {
      const restaurantData = {
        'Gogi House - Quán thịt nướng Hàn Quốc': [
          { id: 1, image: require('../assets/gogi.png'), name: 'Gogi House Bùi Thị Xuân', address: '151 Bùi Thị Xuân, Hai Bà Trưng, Hà Nội', phone: '02473007341', rating: 4.5},
          { id: 2, image: require('../assets/gogi.png'), name: 'Gogi House Vincom Phạm Ngọc Thạch', address: 'L5-01 & 02, Tầng 5, TTTM Vincom Phạm Ngọc Thạch, Đống Đa, Hà Nội', phone: '0987654321', rating: 4.2 },
          { id: 3, image: require('../assets/gogi.png'), name: 'Gogi House Lê Trọng Tấn', address: 'Số 182 Lê Trọng Tấn ', phone: '1357924680', rating: 4.0 }
        ],
        'GoGi Steak': [
          { id: 4, image: require('../assets/gogi.png'), name: 'GoGi Steak Lê Văn Lương', address: 'Số 182 Lê Văn Lương ', phone: '1357924680', rating: 4.0 },
          { id: 5, image: require('../assets/gogi.png'), name: 'GoGi Steak Nguyễn Khánh Toàn', address: 'Số 182 Nguyễn Khánh Toàn ', phone: '1357924680', rating: 4.0 }
        ],
        'Kichi-Kichi - Lẩu băng chuyền' :[
          { id: 6, image: require('../assets/gogi.png'), name: 'Kichi-Kichi Vincom Bà Triệu', address: 'Bà Triệu ', phone: '1357924680', rating: 4.5 },
          { id: 7, image: require('../assets/gogi.png'), name: 'Kichi-Kichi Tràng Tiền Plaza', address: 'Hoàn Kiếm ', phone: '1357924680', rating: 4.0 },
          { id: 8, image: require('../assets/gogi.png'), name: 'Kichi-Kichi Times City', address: 'Minh Khai', phone: '1357924680', rating: 4.0 },
          { id: 9, image: require('../assets/gogi.png'), name: 'Kichi-Kichi Royal City', address: 'Thanh Xuân', phone: '1357924680', rating: 4.0 },
        ]
      };
  
      return restaurantData[brand] || [];
    } catch (error) {
      throw new Error('Error fetching restaurants:', error);
    }
  };
  

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setShowTimePicker(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowRestaurantList(true);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Picker
        selectedValue={selectedCity}
        onValueChange={handleCitySelect}
        style={{ width: '100%', height: 50, border: 'none',  marginBottom: 10 }}
      >
        {cities.map((city, index) => (
          
          <Picker.Item label={city.label} value={city.value} key={index} />
          
        ))}
      </Picker>

      <Picker
        selectedValue={selectedBrand}
        onValueChange={handleBrandSelect}
        style={{ width: '100%', height: 50, borderWidth: 0, borderColor: 'white', marginBottom: 10 }}
      >
        <Picker.Item icon={() => brandIcon} label="Chọn thương hiệu" value={null} />
        {brands.map((brand, index) => (
          <Picker.Item label={brand.name} value={brand.name} key={index} />
        ))}
      </Picker>
      {showTimePicker && (
        <Picker
          selectedValue={selectedTime}
          onValueChange={handleTimeSelect}
          style={{ width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 }}
        >
          <Picker.Item label="Chọn thời gian" value={null} />
          {times.map((time, index) => (
            <Picker.Item label={time} value={time} key={index} />
          ))}
        </Picker>
      )}

      {loading ? (
        <Text>Loading...</Text>
      ) : showRestaurantList ? (
        <View>
          <Text style={{textAlign:"center"}}>Danh sách nhà hàng còn bàn</Text>
          <ScrollView style={{ flex: 1 }}>
            {restaurants.map((restaurant, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('BookingInfo', { 
                  restaurantId: restaurant.id,
                  restaurantName: restaurant.name,
                  restaurantImage: restaurant.image,
                })}
                style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5 }}
              > 
                <ImageBackground source={restaurant.image} style={{ width: 100, height: 100 }} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text>{restaurant.name}</Text>
                  <Text>{restaurant.address}</Text>
                  <Text>{restaurant.phone}</Text>
                  <Text>Rating: {restaurant.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default BookingScreen;
