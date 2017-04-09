import React, { Component } from 'react';
import StockList from './stock_list';
import StockDetail from './stock_detail';
var moment = require('moment');
const WS_URL = 'ws://stocks.mnet.website';

import '../App.css';

class App extends Component {

    constructor(props) {
        super(props);
        
        // Stock: name, price, lastupdated, bgcolor
        this.state = { 
            stocks: {},
            selectedStock: null
        };

    }

    roundOffDecimals(value) {
        return Math.round(value * 100) / 100;
    }

    addNewState(name, price) {
        let temp = this.state.stocks;
        const lastupdated = moment().format('h:mm:ss a');
        temp[name] = {name: name, price: price, bg: 'white', 
                      chartinfo: [{price: price, lastupdated: lastupdated}], 
                      lastupdated: lastupdated};
        this.setState({stocks: temp});
        if(!this.state.selectedStock) {
            this.setState({selectedStock: this.state.stocks[name]});
        }
    }

    updateExistingState(name, price) {
        let temp = this.state.stocks;
        const stock = this.state.stocks[name];
        let newbg = 'label label-success';
        if(price < stock.price) {
            newbg = 'label label-danger';
        }
        let chartinfo = stock.chartinfo;
        let lastupdated = moment().format('h:mm:ss a');
        chartinfo.push({price: price, lastupdated: lastupdated});
        temp[name] = {name: name, price: price, bg: newbg, 
                      chartinfo: chartinfo, lastupdated: moment().format('h:mm:ss a')};
        this.setState({stocks: temp});  
    }


    handleData(data){
        let result = JSON.parse(data);
        result.forEach(([name, price]) => {
            const roundprice = this.roundOffDecimals(price);
            if(!this.state.stocks[name]) {
                this.addNewState(name, roundprice);
            }
            else{
                this.updateExistingState(name, roundprice)
            }
        });
    }

    componentDidMount() {
        this.connection = new WebSocket(WS_URL);
        this.connection.onmessage = evt => { 
            this.handleData(evt.data);
        };
        this.connection.onerror = (error) => {
            console.log(error);
        }
        this.connection.onclose = (event) => {
            console.log(event);
        }
    }

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

export default App;
