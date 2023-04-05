import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import {
  Input2,
  Input3,
  InputRestaurant,
  InputRestaurant2,
} from './components/Input';
import Button, {Button2} from './components/Button';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import {useContext} from 'react';
import styles from './conts/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

  const handleAddFood = () => {
    const newFoodItem = {name: foodName, price: price};
    setFoodItems([...foodItems, newFoodItem]);
    setFoodName('');
    setPrice('');
    setNumInputs(numInputs + 1);
  };
  const handleAddRestaurant = () => {
    const restaurantDetails = {
      name,
      address,
      description,
      foodItems,
    };
    console.log(restaurantDetails);
  };

  const chooseImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('result', result);
      // Do something with the selected image
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error', err);
      }
    }
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
          <InputRestaurant2
            label={'Description'}
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder={'Description'}
          />
        </View>
        <View style={{}}>
          <Button title="Add image " onPress={chooseImage} />
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
