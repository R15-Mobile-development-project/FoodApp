import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS} from '../conts/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {ThemeContext} from './ThemeContext';
import {useContext} from 'react';
import styles from '../conts/Styles';

const CustomDrawer = props => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: COLORS[theme].primary,
      }}>
      <View style={styles.drawerView2}>
        <Text style={[styles.drawerText1, {color: COLORS[theme].quaternary}]}>
          User Name
        </Text>
        <View style={styles.drawerView3}>
          <Text style={[styles.drawerText2, {color: COLORS[theme].quaternary}]}>
            280€
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
            <Icon name="wallet" size={30} color={COLORS[theme].quaternary} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.drawerView,
          {backgroundColor: COLORS[theme].quaternary},
        ]}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
