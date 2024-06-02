import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image } from 'react-native';


const BrandScreen = () => {
  const [brands, setBrands] = useState([
    { id: 1, name: 'Dookki' },
    { id: 2, name: 'Gogi House' },
    { id: 3, name: 'Haidilao' },
  ]);
  const [searchText, setSearchText] = useState('');

  const profile_images = [
    require('../assets/dookki.jpg'),
    require('../assets/gogi.png'),
    require('../assets/haidilao.jpg'),
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredBrands = brands.filter((brand) =>
      brand.name.toLowerCase().includes(text.toLowerCase())
    );
    setBrands(filteredBrands);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ padding: 10, marginHorizontal: 20 }}
        placeholder="Nhập tên thương hiệu ..."
        value={searchText}
        onChangeText={(text) => handleSearch(text)}
      />

      <FlatList
        style={{ flex: 1 }}
        data={brands}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', padding: 10, borderColor: '#ccc' }}>
            <Image
              source={profile_images[index]}
              style={{ width: 720, height: 280}}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default BrandScreen;
