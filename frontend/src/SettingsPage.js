import {View, Text} from 'react-native';
import styles from './conts/Styles';
import Button from './components/Button';
import {KeyboardAvoidingView} from 'react-native';

function SettingsPage() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Dark/Lihgtmode" />
        <Button title="delete user" />
        <Button title="jaa" />
      </View>
    </KeyboardAvoidingView>
  );
}
export default SettingsPage;
