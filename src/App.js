import './App.css';
import Home from './Components/Home';
import SearchPage from './Components/SearchPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "./Components/Responcive.css"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="app">
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search/:text">
            <SearchPage />
          </Route>
        </div>
      </Switch>

    </BrowserRouter>

  );
}

export default App;
