import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/layouts/Home";
import ProfileDetail from "./components/layouts/ProfileDetail";
import { useState } from "react";
import PoojaCategories from "./components/layouts/PoojaCategories";
import Services from "./components/layouts/Services";
import Confirmtion from "./components/layouts/Confirmtion";

function App() {
  const [panditDetail, setPanditDetail] = useState({});
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setPanditDetail={setPanditDetail}
                panditDetail={panditDetail}
              />
            }
          />
          <Route
            path="/createprofile"
            element={<ProfileDetail panditDetail={panditDetail} />}
          />
          <Route path="/poojacategories" element={<PoojaCategories panditDetail={panditDetail} />} />
          <Route path="/services" element={<Services panditDetail={panditDetail} />} />
          <Route path="/confirmation" element={<Confirmtion />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
