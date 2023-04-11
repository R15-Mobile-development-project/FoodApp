import React, {useState, useContext} from 'react';
import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Input3, InputRestaurant, InputRestaurant2} from './components/Input';
import Button from './components/Button';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import styles from './conts/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GetToken} from './components/Token';
import axios from './components/axios';

function AddRestaurant() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const {theme} = useContext(ThemeContext);
  const [foodItems, setFoodItems] = useState([]);
  const [numInputs, setNumInputs] = useState(1);
  const [image, setImage] = useState('');

  const handleAddFood = () => {
    const newFoodItem = {name: foodName, price: price};
    setFoodItems([...foodItems, newFoodItem]);
    setFoodName('');
    setPrice('');
    setNumInputs(numInputs + 1);
  };
  const handleAddRestaurant = async () => {
    const token = await GetToken();
    const headers = {headers: {Authorization: `Bearer ${token}`}};
    if (!token) {
      return;
    }

    const restaurantDetails = {
      name: name,
      address: address,
      description: description,
      image: image,
      menus: foodItems,
    };
    console.log(restaurantDetails);
    axios
      .post('/user/addr', restaurantDetails, headers)
      .then(response => {
        console.log(response);
        setStatusMsg('Restaurant Added Successfully');
        setName('');
        setAddress('');
        setDescription('');
        setImage('');
        setFoodItems([]);
        setFoodName('');
        setPrice('');
        setNumInputs(1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={{backgroundColor: COLORS[theme].quaternary}}>
      <KeyboardAvoidingView
        style={[
          styles.containerRestaurant,
          {backgroundColor: COLORS[theme].quaternary},
        ]}>
        <View style={styles.inputContainer}>
          <InputRestaurant
            label={'Restaurant Name'}
            value={name}
            onChangeText={text => setName(text)}
            placeholder={'Restaurant Name'}
          />
          <InputRestaurant
            label={'Address'}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder={'Address'}
          />
          <InputRestaurant
            label={'Image'}
            value={image}
            onChangeText={text => setImage(text)}
            placeholder={'Image Link'}
          />
          <InputRestaurant2
            label={'Description'}
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder={'Description'}
          />
        </View>
        <View style={{width: '80%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '60%'}}>
              <Text style={[styles.label, {color: COLORS[theme].primary}]}>
                Food Name
              </Text>
            </View>
            <View style={{width: '40%'}}>
              <Text style={[styles.label, {color: COLORS[theme].primary}]}>
                Price
              </Text>
            </View>
          </View>
          {Array.from({length: numInputs}).map((_, index) => (
            <View key={index} style={{flexDirection: 'row', marginVertical: 5}}>
              <View style={{width: '60%'}}>
                <Input3
                  value={foodItems[index]?.name || ''}
                  onChangeText={text => {
                    const newFoodItems = [...foodItems];
                    newFoodItems[index] = {...newFoodItems[index], name: text};
                    setFoodItems(newFoodItems);
                  }}
                  placeholder={'Food Name'}
                />
              </View>
              <View style={{width: '40%'}}>
                <Input3
                  value={foodItems[index]?.price || ''}
                  onChangeText={text => {
                    const newFoodItems = [...foodItems];
                    newFoodItems[index] = {...newFoodItems[index], price: text};
                    setFoodItems(newFoodItems);
                  }}
                  keyboardType={'numeric'}
                  placeholder={'Price'}
                />
              </View>
            </View>
          ))}
          <View>
            <View style={{marginRight: 10}}>
              <Icon
                name="plus-circle-outline"
                size={30}
                onPress={handleAddFood}
                style={{color: COLORS[theme].primary}}
              />
            </View>
            <View style={[styles.buttonContainer]}>
              <Button title="Add" onPress={handleAddRestaurant} />
            </View>
          </View>
        </View>

        <View style={styles.statusMsgContainer}>
          <Text
            style={{
              color: COLORS[theme].primary,
            }}>
            {statusMsg ? statusMsg : ''}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AddRestaurant;
