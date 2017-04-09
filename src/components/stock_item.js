import React from 'react';

/**
* StockItem component is used to render the individual item in the list panel
* onStockSelect selects the current Stock and displays details about this stock 
*/
const StockItem = ({stock, onStockSelect}) => {

	return (
		<tr onClick={() => onStockSelect(stock)} className="cursurPointer">
			<td> {stock.name} </td>
			<td className={stock.bgClass}> {stock.price} </td>
			<td> {stock.lastupdated} </td>
		</tr>
	);

}

// Exporting StockItem
export default StockItem;
