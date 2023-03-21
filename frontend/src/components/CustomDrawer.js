import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../conts/colors';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor: COLORS.primary}}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 5,
            color: COLORS.quaternary,
          }}>
          User Name
        </Text>
        <View style={{flexDirection: 'row'}}>
          {/* TODO: get balance from backend */}
          <Text
            style={{
              marginRight: 5,
              color: COLORS.quaternary,
            }}>
            280€
          </Text>
        </View>
      </View>
      <View
        style={{flex: 1, backgroundColor: COLORS.quaternary, paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
