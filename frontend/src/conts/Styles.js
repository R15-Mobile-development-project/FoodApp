import {DrawerView} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
  //Containers
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
    gap: 10,
  },
  statusMsgContainer: {
    marginTop: 20,
  },
  // Buttons
  buttonOne: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOneOutline: {
    backgroundColor: COLORS.quaternary,
    marginTop: 5,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonOneText: {
    color: COLORS.quaternary,
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOneOutlineText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  // Inputs
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.primary,
    borderRadius: 10,
  },
  inputContainer2: {
    height: 55,
    backgroundColor: COLORS.tertiary,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  input: {
    color: COLORS.primary,
    flex: 1,
  },
  input2: {
    color: COLORS.primary,
    width: '100%',
  },
  inputIcon: {
    color: COLORS.primary,
    fontSize: 22,
    marginRight: 10,
  },
  inputPassIcon: {
    color: COLORS.primary,
    fontSize: 22,
  },
  errortext: {
    marginTop: 7,
    color: COLORS.red,
    fontSize: 12,
  },
  //Colors
  primary: {
    color: COLORS.primary,
  },
  //CustomDrawer
  drawerText1: {
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.quaternary,
  },
  drawerText2: {
    fontSize: 15,
    marginRight: 130,
    color: COLORS.quaternary,
  },
  contentContainerStyle: {
    backgroundColor: COLORS.primary,
  },
  drawerView: {
    flex: 1,
    backgroundColor: COLORS.quaternary,
    paddingTop: 10,
  },
  test: {
    drawerStyle: {backgroundColor: COLORS.quaternary, width: 240},
    headerTintColor: COLORS.quaternary,
    headerTitleStyle: {color: COLORS.quaternary},
    headerStyle: {backgroundColor: COLORS.primary},
    //TODO drawerActiveBackgroundColor better when there are better colors
    drawerActiveBackgroundColor: COLORS.primary,
    drawerActiveTintColor: COLORS.quaternary,
    drawerInactiveTintColor: COLORS.primary,
  },
});

export default styles;
