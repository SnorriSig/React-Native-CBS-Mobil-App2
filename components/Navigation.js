import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import EventsOverviewScreen from "../screens/EventsOverviewScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import LoginScreen from "../screens/authScreens/LoginScreen";
import SignupScreen from "../screens/authScreens/SignupScreen";
import { Colors } from "../constants/styles";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import IconButton from "./UI/IconButton";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator          
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTitleStyle: { color: Colors.primary800 },
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator} 
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator 
    // name="Favorites" component={FavoritesScreen} 
       screenOptions={{
        // title: "Favorites",
        // headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "#4967AA",
        sceneContainerStyle: { backgroundColor: Colors.primary100 },
        // drawerIcon: ({ color, size }) => (
        //   <Ionicons name="star" color={color} size={size} />
        // ),
        drawerContentStyle: { backgroundColor: Colors.primary100 },
        drawerActiveTintColor: "#f7f7f3",
        drawerActiveBackgroundColor: "#4967AA",
        drawerInactiveTintColor: "#4967AA",
       }}
    >    
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}      
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer >
        <Stack.Navigator 
          screenOptions={{
            title: "Event details",
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: '#4967AA',
            contentStyle: { backgroundColor: Colors.primary100 },
          }}
        >
          {!authCtx.isAuthenticated && (
            <Stack.Screen
              name="Authenticate"
              component={AuthStack}
              options={{
                headerShown: false,
              }}
            />
          )}
          {authCtx.isAuthenticated && (
            <Stack.Screen
              name="Authendicated"
              component={AuthenticatedStack}
              options={{
                headerShown: false,
              }}
            />
          )}
          {authCtx.isAuthenticated && (
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
          )}
          {authCtx.isAuthenticated && (
            <Stack.Screen
              name="EventOverview" 
              component={EventsOverviewScreen} 
            />
          )}
          {authCtx.isAuthenticated && (
            <Stack.Screen
              name="EventDetail"
              component={EventDetailScreen}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}