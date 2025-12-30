import { createContext, FC, ReactNode, useState } from "react";
import { useColorScheme } from "react-native";
type Theme = 'light' | 'dark'

interface DarkModeContextType {
  theme: Theme,
  toggleTheme: () => void,
  isDark: boolean
}


const ThemeContext = createContext<DarkModeContextType | undefined>(undefined);

export const ThemeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const colorSchema = useColorScheme();
  const [theme, setTheme] = useState<Theme>(colorSchema === "dark" ? "dark" : "light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }


  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

}



export default ThemeContext;
