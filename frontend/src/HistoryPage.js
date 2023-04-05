import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './conts/Styles';
import { Card } from '@rneui/themed';
import axios from './components/axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './conts/colors';
import { ThemeContext } from './components/ThemeContext';

const users = [
  {
    name: 'brynn'
  },
]
function HistoryPage() {

  const [token, setToken] = useState(null);
  const [price, setPrice] = useState();
  const [restaurant, setRestaurant] = useState('');
  const [item, setItem] = useState([]);
  const navigation = useNavigation();
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const FetchOrder = async () => {
      try {
        const _token = await EncryptedStorage.getItem('token');

        if (_token !== undefined) {
          setToken(_token);

          const headers = { headers: { Authorization: `Bearer ${_token}` } };

          axios
            .get('/order', {
              headers: { Authorization: `Bearer ${_token}` },
            })
            .then(response => {
              setPrice(response.data[0].price);
              setRestaurant(response.data[0].restaurant_id);
              setItem(response.data[0].order_id);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.log(error);
      }
    };
    navigation.addListener('focus', () => {

      FetchOrder();
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1, backgroundColor: COLORS[theme].quaternary }]}>
      <Card containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS[theme].primary,
        borderRadius: 5,
        borderColor: COLORS[theme].primary
      }}>
        <Card.Title>
          <Text style={{}}>{restaurant}</Text>
        </Card.Title>
        <Card.Divider />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 10 }}>
            <Text>
              {item}
            </Text>
          </View>
          <View style={{ marginRight: 10 }}>
            <Text>
              {price}€
            </Text>
          </View>
        </View>
      </Card>
      <Card style={{}}>
        <Card.Title>{restaurant}</Card.Title>
        <Card.Divider />
        <View>
          <Text>{item}--------------{price}€</Text>
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
}

export default HistoryPage;
