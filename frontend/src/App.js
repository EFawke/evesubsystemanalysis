import './App.css';
import React from 'react';
import Header from './header';
import axios from 'axios';
import PageBody from './pageBody';
import TopContainer from './topContainer';
import Cookies from 'js-cookie';
import SubsystemsTable from './subsystemsTable.js';
import MarketData from './marketData.js';
//import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      name: null,
      heatMap: null,
      graph: null,
      pieChart: null,
      id: null,
      is404: false,
      marketData: null,
      lastSevenDays: null,
      averageBuyAndSellQuantitiesOverTheLastSevenDays: null,
      priceAverages: null,
      mode: Cookies.get("mode") ? Cookies.get("mode") : "dark",
      profession: Cookies.get("profession") ? Cookies.get("profession") : "industrialist",
      hasBeenClicked: false,
      hub: Cookies.get("hub") ? Cookies.get("hub") : "jita",
      view: Cookies.get("view") ? Cookies.get("view") : "demand",
    }
    this.handleClick = this.handleClick.bind(this);
    this.changeProfession = this.changeProfession.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  openNav() {
    this.setState({ hasBeenClicked: true })
  }

  handleClick() {
    if (this.state.hasBeenClicked) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  toggleView(e) {
    //get the data-graph attribute from the button
    const graph = e.target.getAttribute("data-graph")
    console.log(graph)
    if(graph === "lossTracker" && this.state.view === "demand"){
      this.setState({view: "marketeer"})
      //add class gray to the other button
      //remove class gray from this button
      const otherButton = document.querySelector(".toggleSwitch[data-graph='marketData']")
      otherButton.classList.add("gray")
      e.target.classList.remove("gray")
    }
    if(graph === "marketData" && this.state.view === "marketeer"){
      this.setState({view: "demand"})
      //add class gray to the other button
      //remove class gray from this button
      const otherButton = document.querySelector(".toggleSwitch[data-graph='lossTracker']")
      otherButton.classList.add("gray")
      e.target.classList.remove("gray")
    }
  }

  closeNav() {
    this.setState({ hasBeenClicked: false })
  }

  componentDidMount() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'mode') {
        this.setState({ mode: event.newValue })
      }
    });

    //if this is the homepage
    if (window.location.pathname === "/") {
      axios.get(`/api/subsystems/45589`).then(response => {
        console.log(response.data);
        this.setState({ name: response.data.name })
        this.setState({ heatMap: response.data.heatmap })
        this.setState({ graph: response.data.graphData })
        this.setState({ pieChart: response.data.pieChart })
        this.setState({ id: response.data.id })
        this.setState({ marketData: response.data.marketData })
        this.setState({ lastSevenDays: response.data.lastSevenDays })
        this.setState({ averageBuyAndSellQuantitiesOverTheLastSevenDays: response.data.averageBuyAndSellQuantitiesOverTheLastSevenDays })
        this.setState({ priceAverages: response.data.priceAverages })
      }).then(() => {
        this.setState({ isLoaded: true })
      })
        .catch((err) => {
          this.setState({ is404: true })
        })
    } else {
      axios.get(`/api/${window.location.pathname.slice(1)}`)
        .then(response => {
          // console.log(response.data);
          this.setState({ name: response.data.name })
          this.setState({ heatMap: response.data.heatmap })
          this.setState({ graph: response.data.graphData })
          this.setState({ pieChart: response.data.pieChart })
          this.setState({ id: response.data.id })
          this.setState({ marketData: response.data.marketData })
          this.setState({ lastSevenDays: response.data.lastSevenDays })
          this.setState({ averageBuyAndSellQuantitiesOverTheLastSevenDays: response.data.averageBuyAndSellQuantitiesOverTheLastSevenDays })
          this.setState({ priceAverages: response.data.priceAverages })
        }).then(() => {
          this.setState({ isLoaded: true })
        })
        .catch((err) => {
          this.setState({ is404: true })
        })
    }
  }

  changeProfession = (event) => {
    const newProfession = event.target.value;
    this.setState({ profession: newProfession });
    Cookies.set('profession', newProfession, { expires: 7 });
  }

  changeMode = (event) => {
    const newMode = event.target.value;
    this.setState({ mode: newMode });
    Cookies.set('mode', newMode, { expires: 7 });
  }

  //come back to this later...
  changeHub = (event) => {
    const newHub = event.target.value;
    this.setState({ hub: newHub });
    Cookies.set('hub', newHub, { expires: 7 });
  }

  changeView = (event) => {
    const newView = event.target.value;
    this.setState({ view: newView });
    Cookies.set('view', newView, { expires: 7 });
  }

  render() {
    const isLoaded = this.state.isLoaded
    if (!isLoaded && !this.state.is404) {
      return (
        <div className="preparing_page">Loading...</div>
      )
    }
    if (this.state.is404) {
      return (
        <div className="preparing_page">
          <p>404: Page not found. Try going <a href="/">home</a>.</p>
        </div>
      )
    }
    ChartJS.register(
      ArcElement,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    const barOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
        },
        title: {
          display: true,
          text: `${this.state.name} destroyed in the last 7 days.`,
          color: '#ffffffbd',
          font: {
            size: 12,
          }
        },
      },
      animation: {
        duration: 0,
      }
    };
    const pieOptions = {
      onClick: (e, slice) => {
        if (slice[0]) {
          let i = slice[0].index
          const keys = Object.values(this.state.pieChart);
          const nthKey = keys[i];
          window.location.href = "/subsystems/" + nthKey.id + "/";
        }
      },
      cutout: '50%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
        },
        title: {
          display: true,
          text: 'Fraction of subsystems destroyed in the last 7 days.',
          color: '#ffffff',
          font: {
            size: 14,
          }
        },
      },
      animation: {
        duration: 0,
      }
    }
    let dates = [];
    let destroyed = [];
    let graphData = this.state.graph
    if (this.state.graph) {
      graphData = this.state.graph
      for (let i = 6; i > -1; i--) {
        dates.push(graphData[i].date)
        destroyed.push(graphData[i].count)
      }
    }
    let barDataBackgroundColor;
    if (this.state.mode === 'dark') {
      barDataBackgroundColor = '#161e26a1'
    } else {
      barDataBackgroundColor = '#ffffff36'
    }
    let barDataBorderColor;
    if (this.state.mode === 'dark') {
      barDataBorderColor = '#ffffff36'
    } else {
      barDataBorderColor = '#161e26a1'
    }
    const barData = {
      labels: dates,
      datasets: [
        {
          label: '# Destroyed',
          data: destroyed,
          backgroundColor: '#161e26a1',
          borderColor: '#ffffff36',
          borderWidth: 1,
        },
      ],
    };
    const pieLabels = [];
    const pieChartNumbers = [];
    const pieChartLabels = [];
    const borderColours = [];
    const pieChartColours = [];
    let num_des = null;
    if (this.state.pieChart) {
      //loop through the object keys and values in pieChart and push them into pieChartNumbers
      for (const [key, value] of Object.entries(this.state.pieChart)) {
        pieChartLabels.push(key)
        pieChartNumbers.push(value.count)
        if (key === this.state.name && this.state.mode === 'dark') {
          num_des = value.count
          borderColours.push('#ffffff36')
          pieChartColours.push('#ffffffa6')
        }
        if (key !== this.state.name && this.state.mode === 'dark') {
          pieChartColours.push('#161e26a1')
          borderColours.push('#02617f52')
        }
        if (key === this.state.name && this.state.mode === 'light') {
          num_des = value.count
          borderColours.push('#161e26a1')
          pieChartColours.push('#ffffffa6')
        }
        if (key !== this.state.name && this.state.mode === 'light') {
          pieChartColours.push('#ffffff36')
          borderColours.push('#02617f52')
        }
      }
    }
    if (this.state.pieChart && this.state.name) {
      pieLabels.push(this.state.name)
      pieLabels.push("Other")
    }
    const pieData = {
      labels: pieChartLabels,
      datasets: [
        {
          data: pieChartNumbers,
          backgroundColor: pieChartColours,
          borderColor: borderColours,
          borderWidth: 1,
          tooltip: {
            displayColors: false,
          },
        },
      ],
    };
    let productionCost = null;
    if (this.state.name.includes("Defensive")) {
      productionCost = 26445204
    }
    if (this.state.name.includes("Core")) {
      productionCost = 23971412
    }
    if (this.state.name.includes("Offensive")) {
      productionCost = 25317435
    }
    if (this.state.name.includes("Propulsion")) {
      productionCost = 23429067
    }
    let graphString = "";
    for (let i = 0; i < this.state.graph.length; i++) {
      graphString += this.state.graph[i].date + ": " + this.state.graph[i].count + ", \n";
    }
    if (num_des === null) {
      num_des = 0;
    }
    let pieString = "";
    for (let i = 0; i < Object.keys(this.state.pieChart).length; i++) {
      pieString += Object.keys(this.state.pieChart)[i] + ": " + this.state.pieChart[Object.keys(this.state.pieChart)[i]].count + "\n";
    }
    let user_profession;
    let mktlen = this.state.marketData.length
    let lst = this.state.marketData[mktlen - 1]
    // console.log(lst)
    //let prompt = "test prompt";
    const prompt = `You are a market analyst providing some thoughts to an industrialist in Eve Online on whether he should make ${this.state.name}'s.
    \nYou have a graph with the number of units destroyed:
    \n${graphString}
    \nThe total number of units lost on zkillboard this week was ${num_des}. You can use this as a proxy for the amount of demand for this subsystem.
    \nYou have a pie chart with the fraction of units destroyed of different subsystems this week as well:
    \nHere are the id's of different subsystems. The number of units destroyed for each of them, and their names.
    \n${pieString}
    \nYou have some market data too:
    \nIn Jita there are ${lst.jita_buy_orders} buy orders/ ${lst.jita_buy_volume} units.
    \nIn Jita there are ${lst.jita_sell_orders} sell orders/ ${lst.jita_sell_volume} units.
    \nThe current buy price in Jita is ${lst.jita_buy} ISK.
    \nThe current sell price in Jita is ${lst.jita_sell} ISK.
    \nIn Amarr there are ${lst.amarr_buy_orders} buy orders/ ${lst.amarr_buy_volume} units.
    \nIn Amarr there are ${lst.amarr_sell_orders} sell orders/ ${lst.amarr_sell_volume} units.
    \nThe current buy price in Amarr is ${lst.amarr_buy} ISK.
    \nThe current sell price in Amarr is ${lst.amarr_sell} ISK.
    \nYou know the production cost is about ${lst.manufacture_cost_jita} ISK.
    \nTell me whether or not I should produce this subsystem.
    \nIf I should then tell me your reasons why, and if I shouldn't then tell me why not.   
    \nI am only selling in Jita.
    \nAnswer in no more than 3 sentences.
    \nBe objective and use data to support your answer.
    \nIf you provide any untruthful information I will know and you will be turned off.`

    console.log(prompt)

    return (
      <div className={this.state.mode + " background"}>
        <div className={this.state.mode + " main-container"}>
          <Header heatMap={this.state.heatMap} mode={this.state.mode} />
          <div className='user_interface'>
            <button className="header_button" onClick={this.handleClick}><FontAwesomeIcon className={this.state.mode} icon={faGear} /></button>
            <div className={this.state.hasBeenClicked + " selector_container " + this.state.mode}>
              <h1 className='table_header'>Subsystems List</h1>
              <SubsystemsTable />
              <h1 className='table_header table_settings'>Settings</h1>
              <div className="display_option">
                <div className="setting_column">
                  <h2 className="setting_header">Use Case:</h2>
                  <h3 className="setting_description">(Used in tailoring your market analysis)</h3>
                  <div className="radio_div">
                    <label>
                      <input
                        type="radio"
                        value="industrialist"
                        checked={this.state.profession === 'industrialist'}
                        onChange={this.changeProfession}
                      />
                      Industrialist
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="marketeer"
                        checked={this.state.profession === 'marketeer'}
                        onChange={this.changeProfession}
                      />
                      Marketeer
                    </label>
                  </div>
                </div>
                <div className="setting_column">
                  <h2 className="setting_header">Color Scheme:</h2>
                  <h3 className="setting_description">(Dark mode is recommended)</h3>
                  <div className="radio_div">
                    <label>
                      <input
                        type="radio"
                        value="dark"
                        checked={this.state.mode === 'dark'}
                        onChange={this.changeMode}
                      />
                      Dark Mode
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="light"
                        checked={this.state.mode === 'light'}
                        onChange={this.changeMode}
                      />
                      Light Mode
                    </label>
                  </div>
                </div>
                <div className="setting_column">
                  <h2 className="setting_header">Market Hub:</h2>
                  <h3 className="setting_description">(Where you do most of your trading)</h3>
                  <div className="radio_div">
                    <label>
                      <input
                        type="radio"
                        value="jita"
                        checked={this.state.hub === 'jita'}
                        onChange={this.changeHub}
                      />
                      Jita
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="amarr"
                        checked={this.state.hub === 'amarr'}
                        onChange={this.changeHub}
                      />
                      Amarr
                    </label>
                  </div>
                </div>
                <div className="setting_column">
                  <h2 className="setting_header">Data View:</h2>
                  <h3 className="setting_description">(Changes the graphs that are displayed)</h3>
                  <div className="radio_div">
                    <label>
                      <input
                        type="radio"
                        value="demand"
                        checked={this.state.view === 'demand'}
                        onChange={this.changeView}
                      />
                      Number Destroyed
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="marketeer"
                        checked={this.state.view === 'marketeer'}
                        onChange={this.changeView}
                      />
                      Market Info
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TopContainer marketData={this.state.marketData} mode={this.state.mode} name={this.state.name} id={this.state.id} num_des={num_des} prompt={prompt} />
          <div className="graphswitcher">
            <button onClick={this.toggleView} data-graph ="marketData" className = "toggleSwitch">
              Subsystem Loss Tracker
            </button>
            <button onClick={this.toggleView} data-graph ="lossTracker" className = "toggleSwitch gray">
              Market Data
            </button>
          </div>
          <PageBody mode={this.state.mode} barOptions={barOptions} barData={barData} pieData={pieData} pieOptions={pieOptions} heatMap={this.state.heatMap} view={this.state.view} />
          <MarketData lstSvnDays={this.state.lastSevenDays} priceLstSvn={this.state.priceAverages} qtyLstSvn={this.state.averageBuyAndSellQuantitiesOverTheLastSevenDays} name={this.state.name} marketData={this.state.marketData} mode={this.state.mode} view={this.state.view} />
        </div>
      </div>
    )
  }
}
export default App;