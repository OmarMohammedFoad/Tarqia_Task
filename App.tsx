import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { ErrorComponent } from './src/components/Error';
import { ThemeContextProvider } from './src/context/DarkMode';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {

  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ErrorBoundary>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
}


export default App;
