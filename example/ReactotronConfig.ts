import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: any;
  }
}

Reactotron.configure().setAsyncStorageHandler!(AsyncStorage) // controls connection & communication settings // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

console.tron = Reactotron;

export default Reactotron;
