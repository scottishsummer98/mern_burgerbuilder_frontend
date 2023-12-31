import { BrowserRouter } from "react-router-dom";
import myStore from "./redux/store";
import { Provider } from "react-redux";
import Root from "./components/main/Root";

const App = () => {
  return (
    <div className="App">
      <Provider store={myStore}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
