import {combineReducers}
       from 'redux';

const conditions = (state = [], action) => {

	switch(action.type){
		case 'INVALIDATE_CONDITIONS':
			return state.map((condition) => {
				return {
					...condition,
					didInvalidate: true
				}
			});
		case 'REQUEST_CONDITIONS':
			return state.map((condition) => {
				return {
					...condition,
					isFetching: true,
					didInvalidate: false
				}
			});
		case 'FAIL_CONDITIONS_REQUEST':

			return state.map((condition) => {
				return {
					...condition,
					isFetching: false,
				}
			});
		case 'RECEIVE_CONDITIONS':

			return action.conditions.map((condition) => {
				return {
					...condition,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				}
			});
		case 'INVALIDATE_CONDITION':
			return [...state.filter((condition) => {
					return condition.id !== action.condition.id;
				}), {
					...action.condition,
					didInvalidate: true
				}];

		case 'REQUEST_CONDITION':
		case 'PUT_CONDITION':
			return [...state.filter((condition) => {
					return condition.id !== action.condition.id;
				}), {
					...action.condition,
					isFetching: true,
					didInvalidate: false
				}];

		case 'DELETE_CONDITION':
			return [...state.filter((condition) => {
					return condition.id !== action.condition.id;
				})];

		case 'FAIL_CONDITION_REQUEST':
		case 'FAIL_CONDITION_PUT':

			return [...state.filter((condition) => {
					return condition.id !== action.condition.id;
				}), {
					...action.condition,
					isFetching: false
				}];

		case 'FAIL_CONDITION_DELETE':

			return [...state, {
				...action.condition,
				isFetching: false,
				didInvalidate: false
			}];

		case 'RECEIVE_CONDITION':
			return [...state.filter((condition) => {
					return condition.id !== action.condition.id;
				}), {
					...action.condition,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}];

		case 'DELETED_CONDITION':

			return state;


		default:
			return state;

	};
};

export default conditions;
