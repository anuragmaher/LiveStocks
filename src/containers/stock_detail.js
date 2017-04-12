import React, {Component} from 'react';
import { connect} from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip} from 'recharts';


class StockDetail extends Component {

    render() {

        const stock = this.props.stock;

        /**
        * This means none of the stock is selected
        */
        if(!stock){
            return <div> Click on the Ticker to view chart details </div>;
        }

        /**
        * Iterating over the chartinfo of the stock and creating a data
        * object for charts
        */
        const data = Object.keys(stock.chartinfo).map((key) => {
            const info = stock.chartinfo[key];
            return {price: info.price, date: info.lastupdated}
        });

        return (
            <div>
            
                <LineChart width={800} height={500} data={data}
                    margin={{top: 100, right: 30, left: 20, bottom: 5}}>
                <Tooltip/>
                <Legend />
                <XAxis/>
                <YAxis/>
                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                </LineChart>
                <div className="highlight"> 
                    <h3> Line Chart - {stock.name} </h3>
                    (Click on the name of the Ticker to see the deailed graph)
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        stock: state.activeStock
    }
}


export default connect(mapStateToProps)(StockDetail);