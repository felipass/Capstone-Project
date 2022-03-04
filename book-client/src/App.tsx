import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import MyNavbar from './components/Navbar';
import HomeWrapper from './components/HomeWrapper';
import About from './components/About';
import Error from './components/Error';

import UserListWrapper from './components/UserListWrapper';

function App() {
  return (

    <Router>
      <MyNavbar />
      <Switch>
        <Route exact path="/">

          <HomeWrapper />

        </Route>
        <Route path="/about">
          <About />
        </Route>


        <Route path="/mybooks">
          <UserListWrapper />
        </Route>
        <Route path="*">
          <Error />
        </Route>

      </Switch>

    </Router>

  );
}

export default App;
