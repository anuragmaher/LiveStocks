import React, { Component } from 'react';
import StockList from './stock_list';
import StockDetail from './stock_detail';
var moment = require('moment');
const WS_URL = 'ws://stocks.mnet.website';
const GREENBG = 'bg-success';
const REDBG = 'bg-danger';

import './app.css';

class App extends Component {

    /**
    * Creates a state object in the form of 
    * { name : { name, price, lastupdated, bgClass, chartInfo} }
    * selectedStock is the stock which is selected for more details
    * @params are the props of the Component
    */
    constructor(props) {
        super(props);
        
        this.state = { 
            stocks: {},
            selectedStock: null
        };

    }

    /**
    * roundOffDecimals rounds off to 2 decimal places
    * @return float
    */
    roundOffDecimals(value) {
        return Math.round(value * 100) / 100;
    }

    /**
    * addNewState adds a state to the state dict
    * @param name
    * @param price 
    * @param lastupdated in date format 
    */
    addNewState(name, price, lastupdated) {
        let temp = this.state.stocks;
        temp[name] = {name: name, price: price, bg: 'white', 
                      chartinfo: [{price: price, lastupdated: lastupdated}], 
                      lastupdated: lastupdated};
        this.setState({stocks: temp});

        // If a stock is not selected, we are selecting the first one
        if(!this.state.selectedStock) {
            this.setState({selectedStock: this.state.stocks[name]});
        }
    }

    /**
    * updateExistingState updates the state values of the existing state
    * @param name
    * @param price 
    * @param lastupdated in date format 
    */
    updateExistingState(name, price, lastupdated) {
        let temp = this.state.stocks;
        const stock = this.state.stocks[name];
        let newbg = GREENBG;
        if(price < stock.price) {
            newbg = REDBG;
        }
        let chartinfo = stock.chartinfo;
        chartinfo.push({price: price, lastupdated: lastupdated});
        temp[name] = {name: name, price: price, bgClass: newbg, 
                      chartinfo: chartinfo, lastupdated: moment().format('h:mm:ss a')};
        this.setState({stocks: temp});  
    }

    /**
    * onWebSocketMessage is called whenever there is a new update from the 
    * websocket server 
    */
    onWebSocketMessage(data){
        let result = JSON.parse(data);
        result.forEach(([name, price]) => {
            const roundprice = this.roundOffDecimals(price);
            const lastupdated = moment().format('h:mm:ss a');

            if(!this.state.stocks[name]) {
                this.addNewState(name, roundprice, lastupdated);
            }
            else{
                this.updateExistingState(name, roundprice, lastupdated)
            }
        });
    }

    /**
    * ComponentDidMount is called whenever the Component is mounted
    * We start listening to the Websocket Server and handle the messages
    */
    componentDidMount() {
        this.connection = new WebSocket(WS_URL);
        this.connection.onmessage = evt => { 
            this.onWebSocketMessage(evt.data);
        };
        this.connection.onerror = (error) => {
            console.log(error);
        }
        this.connection.onclose = (event) => {
            console.log(event);
        }
    }

    /**
    * render method is called when we initiate the App object
    */
    render() {

        return (
            <div>
                <div className="page-header center">
                    <h1> Live Stocks </h1>
                </div>
                <div className="col-md-4">
                <StockList 
                    stocks={this.state.stocks} 
                    onStockSelect={selectedStock => this.setState({selectedStock: selectedStock})}/>
                </div>
                <div className="col-md-8">
                    <StockDetail 
                        stock={this.state.selectedStock} />
                </div>
            </div>
        );
    }

}

// Exporting the App object 
export default App;
