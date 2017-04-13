export const STOCK_SELECTED = 'STOCK_SELECTED';

export function selectStock(stock) {
	// select book is an action creator 
	// needs to return an action 
	return {
		type: STOCK_SELECTED,
		payload: stock
	};
}
