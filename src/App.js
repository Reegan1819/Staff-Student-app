import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Router/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <Layout />
      <ToastContainer />
    </div>
  );
};

export default App;
