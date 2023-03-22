import Button from './components/Button';
import styles from './conts/Styles';
import { View, Text, KeyboardAvoidingView } from 'react-native';

function SaldoPage() {
    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.buttonContainer}>
            <Text>Add saldo</Text>
            <Button
                title="add 5"
            />
            <Button
                title="add 10"
            />
            <Button
                title="add"
            />
        </View>
</KeyboardAvoidingView>
    );
}
export default SaldoPage;