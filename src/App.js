import "./App.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Url from "./components/Url";
import RouteUrl from "./components/RouteUrl";

function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="App">
        <RouteUrl />
        <Url />
      </div>
    </ThemeProvider>
  );
}

export default App;
