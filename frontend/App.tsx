import React, {useState} from 'react';
import MyStack from './src/navigation/Stack';
import {ThemeProvider} from './src/components/ThemeContext';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <MyStack />
    </ThemeProvider>
  );
}

export default App;
