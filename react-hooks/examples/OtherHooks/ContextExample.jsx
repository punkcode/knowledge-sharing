import React from 'react';

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

const ThemeContext = React.createContext(themes.light);
  
const App = () => (
    <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
    </ThemeContext.Provider>
);

const Toolbar = props => (
    <div>
        <ThemedButton />
    </div>
);

// This will re-render if the value in ThemeContext.Provider changes.
const ThemedButton = () => {
    const theme = useContext(ThemeContext);
    
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
        </button>
    );
};