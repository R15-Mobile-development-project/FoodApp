import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../conts/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

const CustomDrawer = props => {
  const navigation = useNavigation();
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
          <Text
            style={{
              fontSize: 15,
              marginRight: 130,
              color: COLORS.quaternary,
            }}>
            280€
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
            <Icon name="wallet" size={30} color={COLORS.quaternary} />
          </TouchableOpacity>
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
