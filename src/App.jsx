//전역 스타일링

import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import Router from "./Router";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
