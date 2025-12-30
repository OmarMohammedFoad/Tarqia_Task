import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import ThemeContext from "../context/DarkMode";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types";


const Stack = createStackNavigator<RootStackParamList>();


export const AppNavigator = () => {
  const theme = useContext(ThemeContext)

  return (<Stack.Navigator initialRouteName="Home"

    screenOptions={
      {
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              console.log("sadsad");
              console.log(theme?.isDark);

              theme?.toggleTheme();
            }}
            style={{ marginRight: 15, padding: 5 }}
          >


            <Text style={{ fontSize: 20 }}>
              {theme?.isDark ? "☀️" : "🌙"}
            </Text>

          </TouchableOpacity>
        )
      }
    }

  >
    <Stack.Screen

      options={{
        headerTitleAlign: "center",
        title: "Welcome to My Store",

      }}
      name="Home" component={
        HomeScreen
      } />
    <Stack.Screen options={{
      headerTitle: ""
    }} name="Details" component={DetailsScreen}



    />
  </Stack.Navigator>)

}
