import React from 'react';

const StockItem = ({stock, onStockSelect}) => {

	return (
		<tr onClick={() => onStockSelect(stock)} className="cursurPointer">
			<td> {stock.name} </td>
			<td className={stock.bg}> {stock.price} </td>
			<td> {stock.lastupdated} </td>
		</tr>
	);

}

export default StockItem;
