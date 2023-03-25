import {StyleSheet} from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.quaternary,
  },
  inputContainer: {
    width: '80%',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  textlink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10
  },
  statusMsgContainer: {
    marginTop: 20
  },
});

export default styles;
