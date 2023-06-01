import "./App.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { RoutePage } from "./route";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
  // axios.defaults.headers.post['Content-Type'] = 'application/json';
  // axios.defaults.headers.post['Accept'] = 'application/json';
  // axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <RoutePage />
    </BrowserRouter>
  );
}

export default App;
