
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css';

function App() {

  return (
    

    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
