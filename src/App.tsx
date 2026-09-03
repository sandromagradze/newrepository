import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ProfileDetail from "./components/ProfileCard/ProfileDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/region" element={<div className="p-6">რეგიონის გვერდი (Region Page)</div>} />
        <Route path="/military" element={<div className="p-6">სამხედრო გვერდი (Military Page)</div>} />
        <Route path="/culture" element={<div className="p-6">კულტურის გვერდი (Culture Page)</div>} />
        <Route path="/politics" element={<div className="p-6">პოლიტიკის გვერდი (Politics Page)</div>} />
        <Route path="/economy" element={<div className="p-6">ეკონომიკის გვერდი (Economy Page)</div>} />
        <Route path="/society" element={<div className="p-6">საზოგადოების გვერდი (Society Page)</div>} />
        <Route path="/law" element={<div className="p-6">სამართლის გვერდი (Law Page)</div>} />
        <Route path="/world" element={<div className="p-6">მსოფლიოს გვერდი (World Page)</div>} />
        <Route path="/sport" element={<div className="p-6">სპორტის გვერდი (Sport Page)</div>} />
        <Route path="/profile/:id" element={<ProfileDetail />} />
      </Route>
    </Routes>
  );
}