import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './components/UI/navbar/NavBar';
import About from './pages/About';
import Posts from './pages/Posts';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path='/about'>
          <About/>
        </Route>
        <Route path='/posts'>
          <Posts/>
        </Route>
        <Redirect to='/posts'/>
      </Switch>
    </BrowserRouter>
  )
}
export default App;
