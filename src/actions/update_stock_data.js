export const UPDATE_STOCK_DATA = 'UPDATE_STOCK_DATA';

export default function(data) {

	return {
		type: UPDATE_STOCK_DATA,
		payload: data
	}
}
