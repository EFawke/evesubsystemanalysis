import './App.css';
import React from 'react';
import Header from './header';
import axios from 'axios';
import PageBody from './pageBody';
import TopContainer from './topContainer';
import Cookies from 'js-cookie';
import SubsystemsTable from './subsystemsTable.js';
import MarketData from './marketData.js';
import TopContainerAbout from './topContainerAbout.js';
//bootstrap
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      about: null,
      isLoaded: false,
      name: null,
      heatMap: null,
      graph: null,
      pieChart: null,
      id: null,
      is404: false,
      amarrPrice: null,
      price: null,
      lastSevenDays: null,
      averageQuants: null,
      priceAverages: null,
      mode: Cookies.get("mode") ? Cookies.get("mode") : "dark",
      profession: Cookies.get("profession") ? Cookies.get("profession") : "industrialist",
      hasBeenClicked: false,
      hub: Cookies.get("hub") ? Cookies.get("hub") : "jita",
      view: Cookies.get("view") ? Cookies.get("view") : "demand",
      advice: null,
      apiKey: null,
      jitaBuild: null,
      prompt: null,
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
    const graph = e.target.getAttribute("data-graph")
    if (graph === "lossTracker" && this.state.view === "demand") {
      this.setState({ view: "marketeer" })
      const otherButton = document.querySelector(".toggleSwitch[data-graph='marketData']")
      otherButton.classList.add("gray")
      e.target.classList.remove("gray")
    }
    if (graph === "marketData" && this.state.view === "marketeer") {
      this.setState({ view: "demand" })
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

    //get the about page
    if (window.location.pathname === "/about/") {
      axios.get(`/api/about`)
        .then(response => {
          console.log(response.data);
          this.setState({ about: response.data })
          this.setState({ isLoaded: true })
        })
    }
    //if this is the homepage
    if (window.location.pathname === "/") {
      axios.get(`/api/subsystems/45589`).then(response => {
        //console.log(response.data);
        this.setState({prompt: response.data.prompt})
        this.setState({ name: response.data.name })
        this.setState({ heatMap: response.data.heatmap })
        this.setState({ graph: response.data.graphData })
        const sortedPieChart = {};
        Object.keys(response.data.pieChart).sort().forEach(function (key) {
          sortedPieChart[key] = response.data.pieChart[key];
        }.bind(this));
        this.setState({ pieChart: sortedPieChart })
        this.setState({ id: response.data.id })
        this.setState({ price: response.data.currentHighestSellPrice })
        this.setState({ amarrPrice: response.data.currentHighestSellPriceAmarr })
        this.setState({ lastSevenDays: response.data.lastSevenDays })
        this.setState({ averageQuants: response.data.averageQuants })
        this.setState({ priceAverages: response.data.priceAverages })
        this.setState({ advice: response.data.advice })
        //set apiKey
        this.setState({ apiKey: response.data.apiKey })
        this.setState({ jitaBuild: response.data.jitaBuild })
      }).then(() => {
        this.setState({ isLoaded: true })
      })
        .catch((err) => {
          console.log(err);
          this.setState({ is404: true })
        })
    } if (window.location.pathname !== "/about/" && window.location.pathname !== "/") {
      axios.get(`/api/${window.location.pathname.slice(1)}`)
        .then(response => {
          //console.log(response.data);
          this.setState({prompt: response.data.prompt})
          this.setState({ name: response.data.name })
          this.setState({ heatMap: response.data.heatmap })
          this.setState({ graph: response.data.graphData })
          const sortedPieChart = {};
          Object.keys(response.data.pieChart).sort().forEach(function (key) {
            sortedPieChart[key] = response.data.pieChart[key];
          }.bind(this));
          this.setState({ pieChart: sortedPieChart })
          this.setState({ id: response.data.id })
          this.setState({ price: response.data.currentHighestSellPrice })
          this.setState({ amarrPrice: response.data.currentHighestSellPriceAmarr })
          this.setState({ lastSevenDays: response.data.lastSevenDays })
          this.setState({ averageQuants: response.data.averageQuants })
          this.setState({ priceAverages: response.data.priceAverages })
          this.setState({ advice: response.data.advice })
          this.setState({ apiKey: response.data.apiKey })
          this.setState({ jitaBuild: response.data.jitaBuild })
        }).then(() => {
          this.setState({ isLoaded: true })
        })
        .catch((err) => {
          console.log(err);
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
    if (window.location.pathname === "/about/") {
      return (
        <div className={this.state.mode + " background"}>
          <div className={this.state.mode + " main-container"}>
            <Header />
            <div className='user_interface'>
              <button className="header_button" onClick={this.handleClick}><FontAwesomeIcon className={this.state.mode} icon={faGear} /></button>
              <div className={this.state.hasBeenClicked + " selector_container " + this.state.mode}>
                <h1 className='sub_list_header table_header'>Subsystems List</h1>
                <SubsystemsTable />
                {/* <h1 className='table_header table_settings'>Settings</h1>
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
                </div> */}
              </div>
            </div>
            {/* <TopContainerAbout /> */}
            <div className="page_body">
              <div className="about_section">
                <h1>What is this?</h1>
                <p>This is a tool for players in Eve Online who are interested in manufacturing Tech 3 Subsystems.</p>
                <p>It was built primarily to assist in deciding which subsystems to manufacture.</p>
                <p>When making a decision on what to produce, it is important to factor in the demand for that item, as well as the current market conditions.</p>
                <p>As such, the subsystems page consists of two main sections: <strong>Subsystem Loss Tracker</strong> and <strong>Market Data</strong>.</p>
                <p>Once the data is loaded on the page, it is also fed into a query to an external AI, which assists in evaluating the current market for the subsystem you are viewing.</p>

                <h2>Subsystem Loss Tracker</h2>
                <p>These graphs give you a break-down of all of the subsystems of the type you are looking at that have been lost in the last 7 days.</p>
                <p>It also shows you how often the subsystem you are viewing has been lost relative to other subsystems.</p>
                <p>This provides a good indication of the current meta, and what people are actually using.</p>

                <h2>Market Data</h2>
                <p>This section shows you the current market conditions for the subsystem you are viewing.</p>
                <p>It displays daily average buy and sell prices for the subsystem in Jita and Amarr (sorry Dodixie).</p>
                <p>It also shows you the current market price for the materials required to manufacture the subsystem.</p>

                <h1>How do I use this?</h1>
                <p>To find different subsystems, you can use the search box at the top of the page.</p>
                <p>Alternatively, a table of all of the subsystems is available by clicking the gear icon in the top left corner of the page.</p>
                <p>Once you have found the subsystem you are interested in, you can click on it to view the data.</p>
                <p>Note: You may also toggle between subsystems by clicking on the segment of the pie chart you are interested in when using the Subsystem Loss Tracker.</p>
              </div>
            </div>
          </div>
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
          color: '#ffffff',
          font: {
            size: 14,
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
      barDataBackgroundColor = '#ffffff'
    } else {
      barDataBackgroundColor = '#ffffff36'
    }
    let barDataBorderColor;
    if (this.state.mode === 'dark') {
      barDataBorderColor = "#ffffff"
    } else {
      barDataBorderColor = '#161e26a1'
    }
    const barData = {
      labels: dates,
      datasets: [
        {
          label: '# Destroyed',
          data: destroyed,
          backgroundColor: '#ffffff50',
          borderColor: '#ffffff',
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
        } else {
          if (key.includes("Tengu") && this.state.mode === 'dark') {
            pieChartColours.push("#0000CC36")
          }
          if (key.includes("Loki") && this.state.mode === 'dark') {
            pieChartColours.push("#A52A2A36")
          }
          if (key.includes("Proteus") && this.state.mode === 'dark') {
            pieChartColours.push("#00CC0036")
          }
          if (key.includes("Legion") && this.state.mode === 'dark') {
            pieChartColours.push("#FFFF3336")
          }
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

    let priceString = "Average prices in the last 7 days: \n";
    for (let i = 0; i < Object.keys(this.state.priceAverages).length; i++) {
      priceString += Object.keys(this.state.priceAverages)[i] + ": " + this.state.priceAverages[Object.keys(this.state.priceAverages)[i]].sell + "\n";
    }

    const getPercentageOfTotal = (num, piechart) => {
      let total = 0;
      for (let i = 0; i < Object.keys(piechart).length; i++) {
        total += piechart[Object.keys(piechart)[i]].count
      }
      return (num / total * 100).toFixed(2) + "%"
    }

    const getSubsystemRank = (piechart) => {
      let rank = 1;
      for (let i = 0; i < Object.keys(piechart).length; i++) {
        if (piechart[Object.keys(piechart)[i]].count > num_des) {
          rank += 1
        }
      }
      return rank
    }

    // const today = this.state.lastSevenDays[6];
    // const jitaSell = this.state.price;
    // const amarrSell = this.state.amarrPrice;
    // const amarrBuy = this.state.priceAverages[today].amarr_buy;
    // const jitaBuy = this.state.priceAverages[today].buy;
    // const jitaBuild = this.state.jitaBuild;
    // const jitaBuild = this.state.priceAverages[today].manufacture_cost_jita;
    // const amarrBuild = this.state.priceAverages[today].manufacture_cost_amarr;
    // const jitaProfit = jitaSell - jitaBuild;
    // const amarrProfit = amarrSell - amarrBuild;
    // const jitaProfitMargin = (jitaProfit / jitaSell * 100).toFixed(2) + "%";
    // const amarrProfitMargin = (amarrProfit / amarrSell * 100).toFixed(2) + "%";
    // const jitaBuyOrders = this.state.averageQuants[today].buy;
    // const jitaSellOrders = this.state.averageQuants[today].sell;
    // const amarrBuyOrders = this.state.averageQuants[today].amarr_buy;
    // const amarrSellOrders = this.state.averageQuants[today].amarr_sell;
    // const percentageOfTotal = getPercentageOfTotal(num_des, this.state.pieChart)
    // const subsystemRank = getSubsystemRank(this.state.pieChart)

//     const prompt = `
//     Subsystem name: ${this.state.name}.
// In the last 7 days, ${num_des} ${this.state.name} subsystems have been lost by players, accounting for ${percentageOfTotal} of subsystem losses this week. If we assume this is an indication of the demand, that makes it rank ${subsystemRank} out of 48.
// Based on the market data, you can build this subsystem for about ${jitaBuild} and sell it for ${jitaSell}, a difference of ${jitaProfit}.
// Given that you can only produce a finite number of subsystems per day, and that you have a finite amount of capital, should you produce this subsystem?
// Answer in 1-2 sentences. Use data to support your answer.`

    //console.log(prompt);

    return (
      <div className={this.state.mode + " background"}>
        <div className={this.state.mode + " main-container"}>
          <Header heatMap={this.state.heatMap} mode={this.state.mode} />
          <div className='user_interface'>
            <button className="header_button" onClick={this.handleClick}><FontAwesomeIcon className={this.state.mode} icon={faGear} /></button>
            <div className={this.state.hasBeenClicked + " selector_container " + this.state.mode}>
              <h1 className='table_header sub_list_header'>Subsystems List</h1>
              <SubsystemsTable />
            </div>
          </div>
          <TopContainer jitaPrice={this.state.price} amarrPrice={this.state.amarrPrice} mode={this.state.mode} name={this.state.name} id={this.state.id} num_des={num_des} advice={this.state.advice} />
          <div className="graphswitcher">
            <button onClick={this.toggleView} data-graph="marketData" className="toggleSwitch">
              Subsystem Loss Tracker
            </button>
            <button onClick={this.toggleView} data-graph="lossTracker" className="toggleSwitch gray">
              Market Data
            </button>
          </div>
          <PageBody mode={this.state.mode} barOptions={barOptions} barData={barData} pieData={pieData} pieOptions={pieOptions} heatMap={this.state.heatMap} view={this.state.view} />
          <MarketData lstSvnDays={this.state.lastSevenDays} priceLstSvn={this.state.priceAverages} qtyLstSvn={this.state.averageQuants} name={this.state.name} mode={this.state.mode} view={this.state.view} />
        </div>
      </div>
    )
  }
}
export default App;