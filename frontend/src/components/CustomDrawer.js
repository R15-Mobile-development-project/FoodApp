import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../conts/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from '../conts/Styles';

const CustomDrawer = props => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={{padding: 20}}>
        <Text style={styles.drawerText1}>User Name</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.drawerText2}>280€</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
            <Icon name="wallet" size={30} color={COLORS.quaternary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.drawerView}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
