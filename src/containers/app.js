import React, { Component } from 'react';
import StockList from '../containers/stock_list';
const WS_URL = 'ws://stocks.mnet.website';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import updateStockData from '../actions/update_stock_data';
import StockDetail from './stock_detail';
import './app.css';
import { selectStock } from '../actions/select_stock';

class App extends Component {

    /**
    * Creates a state object in the form of 
    * { name : { name, price, lastupdated, bgClass, chartInfo} }
    * selectedStock is the stock which is selected for more details
    * @params are the props of the Component
    */
    constructor(props, context) {
        super(props, context);
    
        this.onWebSocketMessage = this.onWebSocketMessage.bind(this);
    }

    updateSelectedStock(data) {
        var state = this.context.store.getState();
        if(!state.activeStock) {
            const name = Object.keys(state.stocks)[0];
            const stock = state.stocks[name];
            this.props.selectStock(stock);
            return;
        }
        data.forEach(([name, price]) => {
            if(state.activeStock.name === name) {
                this.props.selectStock(state.stocks[name]);
            }
        });
    }

    /**
    * onWebSocketMessage is called whenever there is a new update from the 
    * websocket server 
    */
    onWebSocketMessage(data){
        const result = JSON.parse(data);
        this.props.updateStockData(result);
        this.updateSelectedStock(result);
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
                    <StockList />
                </div>
                <div className="col-md-8">
                    <StockDetail />
                </div>
            </div>
        );
    }

}

App.contextTypes = {
  store: React.PropTypes.object.isRequired
};


// Here we are mapping the update Socket data dispatch to the reducer 
function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateStockData: updateStockData, selectStock: selectStock}, dispatch)
}

// Connecting the Component to the Reducer object 
export default connect(null, mapDispatchToProps)(App);
