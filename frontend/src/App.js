import './App.css';
import React from 'react';
import Header from './header'
import Hotmap from './heat-map'
import Info from './info'

class App extends React.Component {
  render() {
    return (
      <div className="background">
        <Header />
        <Hotmap/>
        <Info className ="info" shipSelected = {window.location.pathname.replace(/\//g,'')}/>
      </div>
    )
  }
}
export default App;
