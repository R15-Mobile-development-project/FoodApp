import Button from './components/Button';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import {useContext} from 'react';

function SaldoPage() {
  const {theme} = useContext(ThemeContext);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS[theme].quaternary,
      }}>
      <View
        style={{
          width: '60%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Text>Add saldo</Text>
        <Button title="add 5" />
        <Button title="add 10" />
        <Button title="add" />
      </View>
    </KeyboardAvoidingView>
  );
}
export default SaldoPage;
