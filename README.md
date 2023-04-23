# Foodapp

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


This is a 2nd year OAMK mobile project that uses React Native for frontend and Node.js and MySQL for backend. Restaurant owners can list their restaurant on it. Normal users can order food from the restaurants.

---

## Getting started

### Installation

- Clone the project

  ```
  git clone https://github.com/R15-Mobile-development-project/FoodApp.git
  ```

### Database

- Import the database with the following command

  ```sh
  mysql -u root -p < foodapp.sql
  ```

### .env

### Backend

- Create a new file **/backend/.env** and copy the contents from **/backend/.env.example** into it
- Generate JWT_SECRET

  ```js
    node
    require('crypto').randomBytes(64).toString('hex')
  ```

- Fill rest of the fields with database credentials

### Frontend

- Create a new file **/frontend/.env** and copy the contents from **/frontend/.env.example** into it
- Replace the value of `API_URL` with the backend host and port

### Launch the environment

- Launch an Android emulator
- Start MySQL server
- Run `npm start` in backend/
- Run `npm run android` in frontend/

---
## Screenshots

The app should open and look like this. Click on register, there you can choose to be a restaurant owner or a customer.

<img src="./images/Register.png" alt="Register page" width="300">
<img src="./images/Login.png" alt="Login page" width="300">

After logging in you see the home page where you can order food from restaurants after adding money in the wallet page.

<img src="./images/Home.png" alt="Home" width="300">
<img src="./images/Drawer.png" alt="Drawer" width="300">
<img src="./images/Wallet.png" alt="Wallet" width="300">

In profile page user can change their profile data and password

<img src="./images/Profile.png" alt="Profile page" width="300">

In settings you can switch to dark mode or delete your account.

<img src="./images/Settings.png" alt="Settings page" width="300">

After pressing order button on home page user can choose what items to buy

<img src="./images/Order.png" alt="Order" width="300">
<img src="./images/Checkout.png" alt="Checkout" width="300">

After the order is placed, it's shown in the order history page

<img src="./images/OrderHistory.png" alt="OrderHistory" width="300">

---

Restaurant owners can add their own restaurant to the app

<img src="./images/AddRestaurant.png" alt="AddRestaurant" width="300">

<img src="./images/AddRestaurantEdit.png" alt="AddRestaurantEdit" width="300">

After they have added a restaurant they can choose to edit it or delete it

<img src="./images/EditDeleteRestaurant.png" alt="EditDeleteRestaurant" width="300">

---

### Creators Joni Pahikainen, Lasse Suomela, Tomi Laine, Hilppa Huhtanen and Juha-Pekka Kesonen
