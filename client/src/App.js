import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Error from './components/error';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/register' component={Register} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
