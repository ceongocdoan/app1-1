import React from 'react';
import { View } from 'react-native';
import { GoogleSigninButton } from '@react-native-community/google-signin';

const LoginScreen = ({ navigation }) => {
  const handleGoogleSignIn = async () => {
    // Thực hiện xử lý đăng nhập bằng tài khoản Google ở đây
    // Sau khi đăng nhập thành công, chuyển hướng đến màn hình tài khoản
    navigation.navigate('Account');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default LoginScreen;
