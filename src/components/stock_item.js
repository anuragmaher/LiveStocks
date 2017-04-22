import React from 'react';
import { connect } from 'react-redux';
import { selectStock } from '../actions/select_stock';

/**
* StockItem component is used to render the individual item in the list panel
* onStockSelect selects the current Stock and displays details about this stock 
*/
let StockItem = ({stock, dispatch}) => {

	return (
		<tr className="cursurPointer" onClick={() => dispatch(selectStock(stock))}>
			<td> {stock.name} </td>
			<td className={stock.bgClass}> {stock.price} </td>
			<td> {stock.lastupdated} </td>
		</tr>
	);

}

StockItem = connect()(StockItem);

// Exporting StockItem
export default StockItem;
