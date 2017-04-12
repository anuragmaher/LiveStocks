import { combineReducers } from 'redux';
import StocksReducer from './reducer_stocks';
import ActiveStockReducer from './reducer_active_stock';

const rootReducer = combineReducers({
	stocks: StocksReducer,
	activeStock: ActiveStockReducer
});

export default rootReducer;
