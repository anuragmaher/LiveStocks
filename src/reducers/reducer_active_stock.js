import {STOCK_SELECTED} from '../actions/select_stock';

// State argument is not application state, only the state 
// this reducer is responsible for
export default function(state = null, action) {

	switch(action.type) {
		case STOCK_SELECTED:
			return action.payload;
		default: 
			return state;
	}

}
