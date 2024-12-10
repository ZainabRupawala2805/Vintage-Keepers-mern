import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(ThemeContext._currentValue);

  const setThemeNavBarLink = (queryParam) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      headerNavbarLinks: queryParam,
    }));
  };

  const themeCtx = {
    headerNavbarLinks: theme.headerNavbarLinks,
    setThemeNavBarLink,
  };

  return (
    <ThemeContext.Provider value={themeCtx}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
