import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ProfileDetail from "./components/ProfileCard/ProfileDetail";
import GlobalScripts from "./components/GlobalScripts/GlobalScripts";

export default function App() {
  return (
    <>
      <GlobalScripts />

      <Routes>
        <Route element={<Layout />}>

          {/* Default */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Georgian */}
          <Route
            path="/ka"
            element={<Home />}
          />

          <Route
            path="/ka/"
            element={<Home />}
          />

          {/* English */}
          <Route
            path="/en"
            element={<Home />}
          />

          <Route
            path="/en/"
            element={<Home />}
          />

          {/* Categories */}
          <Route
            path="/region"
            element={
              <div className="p-6">
                რეგიონის გვერდი
              </div>
            }
          />

          <Route
            path="/military"
            element={
              <div className="p-6">
                სამხედრო გვერდი
              </div>
            }
          />

          <Route
            path="/culture"
            element={
              <div className="p-6">
                კულტურის გვერდი
              </div>
            }
          />

          <Route
            path="/politics"
            element={
              <div className="p-6">
                პოლიტიკის გვერდი
              </div>
            }
          />

          <Route
            path="/economy"
            element={
              <div className="p-6">
                ეკონომიკის გვერდი
              </div>
            }
          />

          <Route
            path="/society"
            element={
              <div className="p-6">
                საზოგადოების გვერდი
              </div>
            }
          />

          <Route
            path="/law"
            element={
              <div className="p-6">
                სამართლის გვერდი
              </div>
            }
          />

          <Route
            path="/world"
            element={
              <div className="p-6">
                მსოფლიოს გვერდი
              </div>
            }
          />

          <Route
            path="/sport"
            element={
              <div className="p-6">
                სპორტის გვერდი
              </div>
            }
          />

          <Route
            path="/profile/:id"
            element={<ProfileDetail />}
          />

        </Route>
      </Routes>
    </>
  );
}