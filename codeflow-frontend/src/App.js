import { Provider } from "react-redux";

import AppNavigation from "../src/navigation/index";
import store from "./store/index";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </>
  );
}

export default App;
