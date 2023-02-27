import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Tv from "./Components/Tv/Tv";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="movies/:id" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
