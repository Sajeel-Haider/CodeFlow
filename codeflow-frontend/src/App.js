import { Provider } from "react-redux";

import AppNavigation from "./navigation/AppRoutes";
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
