import {UPDATE_STOCK_DATA} from '../actions/update_stock_data';
const GREENBG = 'bg-success';
const REDBG = 'bg-danger';
import _ from 'lodash';
var moment = require('moment');

export default function(state = {}, action) {

    /**
    * roundOffDecimals rounds off to 2 decimal places
    * @return float
    */
	function roundOffDecimals(value) {
		return Math.round(value * 100) / 100;
	}
	
	switch(action.type) {

		case UPDATE_STOCK_DATA:
			// Not mutating but returning a new instance of state 
			// return state.concat([action.payload.data]);
			const data = action.payload;
			let temp = state;
			data.forEach(([nameval, price]) => {
				const roundprice = roundOffDecimals(price);
            	const lastupdated = moment().format('h:mm:ss a');
				if(!temp[nameval]) {
					temp[nameval] = {name: nameval,
									 price: roundprice, 
									 lastupdated: lastupdated,
									 chartinfo: [{price: roundprice, 
									 lastupdated: lastupdated}]};
				}
				else {
					const stock = temp[nameval];
					let chartinfo = stock.chartinfo;
			        let newbg = GREENBG;
			        if(roundprice < stock.price) {
			            newbg = REDBG;
			        }
        			chartinfo.push({price: price});
					temp[nameval] = {name: nameval, 
									 price: roundprice, 
									 bgClass: newbg,
									 chartinfo: chartinfo, 
									 lastupdated: lastupdated};	
				}
            });
            return Object.assign({}, state, temp)

		default: 
			return state;
	}
}

/*
{
	'name1': { name: 'name1', price: 12 } ,
	'name2': { name: 'name2', price: 12 } ,
	'name3': { name: 'name3', price: 12 } ,
	'name4': { name: 'name4', price: 12 } ,
	'name5': { name: 'name5', price: 12 },
}
*/
