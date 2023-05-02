import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  default as Header,
  default as TextLinkExample,
} from "./components/Navbar";
import DataFrom from "./pages/DataFrom";
import SampleTable from "./pages/Table";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <>
      <TextLinkExample user={user} />
      <DataFrom user={user} />
      <SampleTable user={user} />
    </>
  );
}

export default App;
