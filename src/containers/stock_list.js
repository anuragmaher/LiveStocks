import React, {Component} from 'react';
import StockItem from '../components/stock_item'
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectStock } from '../actions/select_stock';
import { bindActionCreators } from 'redux';
var Spinner = require('react-spinkit');

// Function to render list of stock items
class StockList extends Component  {

	/**
	* renderStocks iterates over the stocks dict and renders individual items
	*/
	renderStocks() {
		/**
		* This means our stocks data is empty 
		*/
		
		if(!_.size(this.props.stocks)) {
			return <Spinner spinnerName="double-bounce" className="spinnerAlign"/>;
		}

		const stockitems = Object.keys(this.props.stocks).map((key) => {
			const stock = this.props.stocks[key];
			return <StockItem 
						stock={stock} 
						key={stock.name} 
						selectStock={this.props.selectStock} />
		});
		return (
			<table className="table col-md-4 table-hover table-condensed">
				<tbody>	
					<tr>
						<th> Ticker </th>
						<th> Price </th>
						<th> Last updated </th>
					</tr>
				
					{stockitems}
				</tbody>
			</table>
		);
	}

	render() {
		return this.renderStocks();
	}

}

function mapStateToProps(state) {
	return {
		stocks: state.stocks
	}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectStock: selectStock}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(StockList);

