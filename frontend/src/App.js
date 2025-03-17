import React from "react";
import UsersCRUD from "./UsersCRUD";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <UsersCRUD />
    </div>
  );
};

export default App;

