import React from 'react';

const StockItem = ({stock}) => {

	return (
		<tr>
			<td> {stock.name} </td>
			<td className={stock.bg}> {stock.price} </td>
			<td> {stock.lastupdated} </td>
		</tr>
	);

}

export default StockItem;
