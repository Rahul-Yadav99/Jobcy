import SafeScreen from "@/components/SafeScreen";
import { store } from '@/redux/store';
import { Slot } from "expo-router";
import { Provider } from 'react-redux';
import '../global.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </Provider>
  )
}
