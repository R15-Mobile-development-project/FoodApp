import {View, Text} from 'react-native';
import COLORS from './conts/colors';

function SettingsPage() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.quaternary,
      }}>
      <Text style={{color: COLORS.primary}}>SettingsPage</Text>
    </View>
  );
}
export default SettingsPage;
