import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    primary: "aqua",
    secondary: "rgb(228, 255, 255);",
  },
};

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
