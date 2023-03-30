import React, {useEffect} from 'react';
import {DeleteToken} from './components/Token';
import {useNavigation, CommonActions} from '@react-navigation/native';

function LogoutPage() {
  const navigation = useNavigation();

  useEffect(() => {
    const DeleteSession = async () => {
      await DeleteToken();
      navigation.popToTop();
    };
    DeleteSession();
  }, []);
  return <></>;
}

export default LogoutPage;
