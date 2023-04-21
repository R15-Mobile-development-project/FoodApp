import React, {useEffect} from "react";
import {DeleteToken} from "./components/Token";
import {useNavigation, CommonActions} from "@react-navigation/native";

// Define LogoutPage component
function LogoutPage() {
  // Define state variables
  const navigation = useNavigation();

  // Delete session function
  useEffect(() => {
    const DeleteSession = async () => {
      // Delete the token
      await DeleteToken();
      // Navigate to the Login page
      navigation.dispatch(
        // Reset the navigation stack to the Login page
        CommonActions.reset({
          index: 1,
          routes: [{name: "Login"}],
        }),
      );
    };
    DeleteSession();
  }, []);
  return <></>;
}

export default LogoutPage;
