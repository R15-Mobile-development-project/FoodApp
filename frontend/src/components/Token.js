import EncryptedStorage from "react-native-encrypted-storage";

// Retrieves the authentication token from storage
const GetToken = async () => {
  try {
    const token = await EncryptedStorage.getItem("token");

    if (token !== undefined) {
      return token;
    } else {
      console.log("No jwt found");
      return null;
    }
  } catch (error) {
    console.log("Error on fetchin token from storage");
    console.log(error);
    return null;
  }
};

// Deletes the authentication token from storage
const DeleteToken = async () => {
  try {
    await EncryptedStorage.removeItem("token");
    console.log("Token deleted");
  } catch (error) {
    console.log("Error on deleting token");
    console.log(error);
    return null;
  }
};

// Saves the authentication token to storage
const SaveToken = async token => {
  try {
    console.log("Saving token");
    await EncryptedStorage.setItem("token", token);
  } catch (error) {
    console.log("Error on saving token");
    console.log(error);
    return null;
  }
};

// Saves the user's preferred mode (e.g. light or dark mode) to storage
const SaveMode = async mode => {
  try {
    console.log("Saving mode");
    await EncryptedStorage.setItem("mode", mode);
  } catch (error) {
    console.log("Error on saving mode");
    console.log(error);
    return null;
  }
};

// Retrieves the user's preferred mode from storage
const GetMode = async () => {
  try {
    const mode = await EncryptedStorage.getItem("mode");

    if (mode !== undefined) {
      return mode;
    } else {
      console.log("No mode found");
      return null;
    }
  } catch (error) {
    console.log("Error on fetchin mode from storage");
    console.log(error);
    return null;
  }
};

// Deletes the user's preferred mode from storage
const DeleteMode = async () => {
  try {
    await EncryptedStorage.removeItem("mode");
    console.log("Mode deleted");
  } catch (error) {
    console.log("Error on deleting mode");
    console.log(error);
    return null;
  }
};

// Exports the functions so they can be used by other modules
module.exports = {
  GetToken,
  DeleteToken,
  SaveToken,
  SaveMode,
  GetMode,
  DeleteMode,
};
