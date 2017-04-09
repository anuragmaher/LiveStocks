import React, { Component } from 'react';
import StockList from './stock_list';
const WS_URL = 'ws://stocks.mnet.website';

import '../App.css';

class App extends Component {

    constructor(props) {
        super(props);
        
        // Stock: name, price, lastupdated, bgcolor
        this.state = { 
            stocks: {},
        };

    }

    handleData(data){
        let result = JSON.parse(data);
        result.forEach(([name, price]) => {
            if(!this.state.stocks[name]) {
                let temp = this.state.stocks;
                temp[name] = {name: name, price: price, bg: 'white'};
                this.setState({stocks: temp});
            }
            else{
                let temp = this.state.stocks;
                const stock = this.state.stocks[name];
                let newbg = 'green';
                if(price < stock.price) {
                    newbg = 'red';
                }
                temp[name] = {name: name, price: price, bg: newbg};
                this.setState({stocks: temp});  
            }
        });
    }

    componentDidMount() {
        this.connection = new WebSocket(WS_URL);
        this.connection.onmessage = evt => { 
            this.handleData(evt.data);
        };      
    }

    render() {
        return (
            <StockList stocks= {this.state.stocks}/>
        );
    }

}

export default App;
