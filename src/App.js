import { Routes, Route } from "react-router-dom";
import routes from "./core/routes";

import Header from "./components/Header";

import "./app.scss";
import "./styles/bootstrap-overrides.scss";

const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default App;
