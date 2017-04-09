import React from 'react';
import StockItem from './stock_item'
import _ from 'lodash';

// Function to render list of stock items
const StockList = ({stocks, onStockSelect}) => {

	/**
	* This means our stocks data is empty 
	*/
	if(!_.size(stocks)) {
		return <div> Connecting to Websocket ... </div>;
	}

	/**
	* renderItems iterates over the stocks dict and renders individual items
	*/
	const renderItems = Object.keys(stocks).map((key) => {
		let stock = stocks[key];
		return (
			<StockItem 
				stock={stock}
				key={stock.name}
				onStockSelect={onStockSelect}
			/>
		);
	});

	return (
		<table className="table col-md-4 table-hover table-condensed">
			<tbody>	
				<tr>
					<th> Ticker </th>
					<th> Price</th>
					<th> Last updated </th>
				</tr>
			
				{renderItems}
			</tbody>
		</table>
	);	
}

export default StockList;
