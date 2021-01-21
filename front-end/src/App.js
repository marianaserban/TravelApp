
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AddReview from './components/AddReview'
import Profile from './components/Profile'
import ProfileEdit from './components/ProfileEdit'
import Search from './components/Search'
import SeeYourReviews from './components/SeeYourReviews'
import RessetPassword from './components/RessetPassword'
import EditReview from './components/EditReview'
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
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/edit" exact component={ProfileEdit} />
            <Route path="/addReview" exact component={AddReview} />
            <Route path="/seeYourReviews" exact component={SeeYourReviews} />
            <Route path="/search" exact component={Search} />
            <Route path="/resetPassword" exact component={RessetPassword} />
            <Route path="/editReview" exact component={EditReview} />

            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
