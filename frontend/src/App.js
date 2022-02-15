import './App.css';
import React from 'react';
import Header from './header'
import Heatmap from './heat-map'
import Info from './info'
// import HoverInfo from './hover';

class App extends React.Component {
  render() {
    return (
      <div className="background">
        <Header />
        <Heatmap shipSelected = {window.location.pathname.replace(/\//g,'')}/>
        {/* <Info className ="info" shipSelected = {window.location.pathname.replace(/\//g,'')}/> */}
        {/* <HoverInfo hour="05" day="Sunday" ship="Gila"/> */}
      </div>
    )
  }
}
export default App;
