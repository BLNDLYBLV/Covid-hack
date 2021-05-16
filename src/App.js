import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile'

function App() {

  const userState = useSelector(state => state.user);

  const ensureAuth = (route,component) => {
    return ( userState.session==='' ? (
      <Route exact path={route}>
          <Redirect to='/login'  />
      </Route>
    ) 
    : (<Route exact path={route}>
        {component}
      </Route>)
    )
  }

  // const route = (route,component) => {
  //   return (<Route exact path={route}>
  //     {component}
  //   </Route>)
  // }

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        {/* {route('/',Home)}
        {route('/login',Login)}
        {route('/register',Register)} */}
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        {ensureAuth('/profile',Profile)}
        {ensureAuth('*',Home)}
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
