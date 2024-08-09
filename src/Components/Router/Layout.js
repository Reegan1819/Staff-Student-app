import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RouteList } from "./RouteList";

const Layout = () => {

    console.log(RouteList);
    
  return (
    <div>
      <Router>
        <Routes>
          {RouteList.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
};

export default Layout;
