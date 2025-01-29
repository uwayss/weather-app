// src/context/theme.js (or src/theme/theme.js)

export const lightTheme = {
    background: 'bg-slate-300/60', // Example: light glassy background
    text: 'text-slate-900',       // Example: dark text for light mode
    // ... add more colors as needed for light mode
};

export const darkTheme = {
    background: 'bg-slate-700/60',  // Example: dark glassy background
    text: 'text-white',            // Example: white text for dark mode
    // ... add more colors as needed for dark mode
};

const themes = {
    light: lightTheme,
    dark: darkTheme,
};

export default themes;