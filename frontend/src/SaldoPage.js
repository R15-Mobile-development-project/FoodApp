import Button from './components/Button';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import {useContext} from 'react';
import styles from './conts/Styles';

function SaldoPage() {
  const {theme} = useContext(ThemeContext);
  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      <View style={styles.buttonContainer}>
        <Text>Add saldo</Text>
        <Button title="add 5" />
        <Button title="add 10" />
        <Button title="add" />
      </View>
    </KeyboardAvoidingView>
  );
}
export default SaldoPage;
