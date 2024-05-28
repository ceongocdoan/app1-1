import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Picker, ImageBackground } from 'react-native';

const BookingScreen = () => {
  const [selectedCity, setSelectedCity] = useState('Hà Nội');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTime, setSelectedTime] = useState('10:30');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const cities = [
    { label: 'Hà Nội', value: 'Hà Nội' },
    { label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
    { label: 'Đà Nẵng', value: 'Đà Nẵng' }
  ];

  const brands = [
    { name: 'Gogi House - Quán thịt nướng Hàn Quốc' },
    { name: 'GoGi Steak' },
    { name: 'Kichi-Kichi - Lẩu băng chuyền'}
  ];

  const times = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
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

  // This function is just a placeholder, you need to replace it with actual API call
  const fetchRestaurants = async (city, brand, time) => {
    try {
      // Perform API call to fetch restaurant data based on city, brand, and time
      let responseData = [];
  
      // Sample data for demonstration
      const restaurantData = {
        'Gogi House - Quán thịt nướng Hàn Quốc': [
          {image:'../assets/gogi.png', name: 'Gogi House Bùi Thị Xuân', address: '151 Bùi Thị Xuân, Hai Bà Trưng, Hà Nội', phone: '02473007341', rating: 4.5 },
          {image:'../assets/gogi.png', name: 'Gogi House Vincom Phạm Ngọc Thạch', address: 'L5-01 & 02, Tầng 5, TTTM Vincom Phạm Ngọc Thạch, Đống Đa, Hà Nội', phone: '0987654321', rating: 4.2 },
          {image:'../assets/gogi.png', name: 'Gogi House Lê Trọng Tấn', address: 'Số 182 Lê Trọng Tấn ', phone: '1357924680', rating: 4.0 }
        ],
        'GoGi Steak': [
          { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQphVeoNshRuKQRDf3hbQxzqnSSTsL9TnhpL61_cGPTmw&s',name: 'GoGi Steak Lê Văn Lương', address: 'Số 182 Lê Văn Lương ', phone: '1357924680', rating: 4.0 },
          { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQphVeoNshRuKQRDf3hbQxzqnSSTsL9TnhpL61_cGPTmw&s',name: 'GoGi Steak Nguyễn Khánh Toàn', address: 'Số 182 Nguyễn Khánh Toàn ', phone: '1357924680', rating: 4.0 }
        ],
        'Kichi-Kichi - Lẩu băng chuyền' :[
          {image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0IEAa0MzXK_m594X9YY6T6x9P5nFn0u7HDKG6sTNxPA&s', name: 'Kichi-Kichi Vincom Bà Triệu', address: 'Bà Triệu ', phone: '1357924680', rating: 4.5 },
          {image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0IEAa0MzXK_m594X9YY6T6x9P5nFn0u7HDKG6sTNxPA&s', name: 'Kichi-Kichi Tràng Tiền Plaza', address: 'Hoàn Kiếm ', phone: '1357924680', rating: 4.0 },
          {image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0IEAa0MzXK_m594X9YY6T6x9P5nFn0u7HDKG6sTNxPA&s', name: 'Kichi-Kichi Times City', address: 'Minh Khai', phone: '1357924680', rating: 4.0 },
          {image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0IEAa0MzXK_m594X9YY6T6x9P5nFn0u7HDKG6sTNxPA&s', name: 'Kichi-Kichi Royal City', address: 'Thanh Xuân', phone: '1357924680', rating: 4.0 },
        ]
      };
  
      // Get restaurant data based on selected brand
      responseData = restaurantData[brand] || [];
  
      return responseData;
    } catch (error) {
      throw new Error('Error fetching restaurants:', error);
    }
  };
  

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <View style={{ flex: 1 }}>
      <Picker
        selectedValue={selectedCity}
        onValueChange={handleCitySelect}
        style={{ width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 }}
      >
        {cities.map((city, index) => (
          <Picker.Item label={city.label} value={city.value} key={index} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedBrand}
        onValueChange={handleBrandSelect}
        style={{ width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 }}
      >
        <Picker.Item label="Chọn thương hiệu" value={null} />
        {brands.map((brand, index) => (
          <Picker.Item label={brand.name} value={brand.name} key={index} />
        ))}
      </Picker>

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

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={{textAlign:"center"}}>Danh sách nhà hàng còn bàn</Text>
          {restaurants.map((restaurant, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5 }}
              > 
                <ImageBackground>{restaurant.image}</ImageBackground>
                <Text>{restaurant.name}</Text>
                <Text>{restaurant.address}</Text>
                <Text>{restaurant.phone}</Text>
                <Text>Rating: {restaurant.rating}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
};

export default BookingScreen;

