import React from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip} from 'recharts';

const StockDetail  = ({stock}) => {

	if(!stock){
		return <div> Loading ... </div>;
	}

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

      	<h3 className="center"> Line Chart : {stock.name} </h3>
      	</div>
	);

}

export default StockDetail;