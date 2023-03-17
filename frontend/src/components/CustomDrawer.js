import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor: '#42C2FF'}}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 5,
          }}>
          User Name
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginRight: 5,
            }}>
            280€
          </Text>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
