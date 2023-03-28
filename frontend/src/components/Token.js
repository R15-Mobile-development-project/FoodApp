import EncryptedStorage from 'react-native-encrypted-storage';

const GetToken = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');

    if (token !== undefined) {
      return token;
    } else {
      console.log('No jwt found');
      return null;
    }
  } catch (error) {
    console.log('Error on fetchin token from storage');
    console.log(error);
    return null;
  }
};

const DeleteToken = async () => {
  try {
    await EncryptedStorage.removeItem('token');
    console.log('Token deleted');
  } catch (error) {
    console.log('Error on deleting token');
    console.log(error);
    return null;
  }
};

const SaveToken = async token => {
  try {
    console.log('Saving token');
    await EncryptedStorage.setItem('token', token);
  } catch (error) {
    console.log('Error on saving token');
    console.log(error);
    return null;
  }
};

module.exports = {
  GetToken,
  DeleteToken,
  SaveToken,
};
