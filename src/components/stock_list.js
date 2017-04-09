import React from 'react';
import StockItem from './stock_item'
import _ from 'lodash';

// Function to render list of stock items
const StockList = ({stocks}) => {

	if(!_.size(stocks)) {
		return <div> Connecting to Websocket ... </div>;
	}

	const renderItems = Object.keys(stocks).map((key) => {
		let stock = stocks[key];
		return (
			<StockItem 
				stock={stock}
				key={stock.name}
			/>
		);
	});

	return (
		<table className="table col-md-4">
			<thead>
				<th> Stock Name</th>
				<th> Price</th>
				<th> Last updated </th>
			</thead>
			<tbody>
				{renderItems}
			</tbody>
		</table>
	);	
}

export default StockList;
