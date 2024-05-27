import React from 'react';
import { View, Button } from 'react-native';
import { GoogleSigninButton } from '@react-native-community/google-signin';

const LoginScreen = () => {
  const handleGoogleSignIn = async () => {
    // Xử lý đăng nhập bằng tài khoản Google ở đây
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
