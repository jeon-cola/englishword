import './App.css';
import {BrowserRouter} from "react-router"
import PageRouter from "./routes/PageRouter"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageRouter/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
