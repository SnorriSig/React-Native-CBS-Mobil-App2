import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import Navigation from "./components/Navigation";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/UI/LoadingOverlay";

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  // Hook provided by react
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="Loading..." />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </AuthContextProvider>
    </>
  );
}
