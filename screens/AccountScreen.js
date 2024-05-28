import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Kiểm tra xem người dùng đã đăng nhập trước đó chưa
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // Lấy thông tin người dùng từ bộ nhớ cục bộ
        const savedUsername = await AsyncStorage.getItem('username');
        setUsername(savedUsername); // Cập nhật tên người dùng
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {username ? ( // Kiểm tra xem đã có tên người dùng chưa
        <View>
          <Text>Welcome back, {username}!</Text>
          {/* Hiển thị thông tin người dùng */}
          <Button title="View Profile" onPress={() => navigation.navigate('Profile', { username })} />
        </View>
      ) : (
        <View>
          <Text>Please log in to continue</Text>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </View>
  );
};

export default AccountScreen;
