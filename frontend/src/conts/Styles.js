import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  //Containers
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerRestaurant: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  textcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textlink: {
    textDecorationLine: "underline",
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  statusMsgContainer: {
    marginTop: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
  },
  // Buttons
  buttonOne: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonTwo: {
    width: "100%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonOneOutline: {
    marginTop: 5,
    borderWidth: 2,
  },
  buttonTwoOutline: {
    marginTop: 5,
    borderWidth: 2,
  },
  buttonOneText: {
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOneOutlineText: {
    fontWeight: "700",
    fontSize: 16,
  },
  // Inputs
  label: {
    marginVertical: 5,
    fontSize: 14,
    borderRadius: 10,
  },
  inputContainer2: {
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  inputContainerRestaurant: {
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  inputContainerRestaurant2: {
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "column",
  },
  input: {
    flex: 1,
  },
  inputView: {
    flexDirection: "row",
    width: "100%",
  },
  inputIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  inputPassIcon: {
    fontSize: 22,
  },
  errortext: {
    marginTop: 7,
    fontSize: 12,
  },
  //CustomDrawer
  drawerText1: {
    fontSize: 18,
    marginBottom: 5,
  },
  drawerText2: {
    fontSize: 15,
    marginRight: 130,
  },
  drawerView: {
    flex: 1,
    paddingTop: 10,
  },
  drawerView2: {
    padding: 20,
  },
  drawerView3: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  //Wallet
  walletContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default styles;
