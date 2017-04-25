import {combineReducers}
       from 'redux';

const lookedUpBooks = (state = {}, action) => {

	switch(action.type){

		case 'LOOKUP_BOOKS':
			return state;

		case 'FAIL_BOOK_LOOKUP':
			return {local: [], external: []};

		case 'LOOKED_UP_BOOKS':
			let newState = {
        ...state
      };

      newState[action.external ? 'external' : 'local'] = action.books;

      return newState;

		default:
			return state;

	};
};

export default lookedUpBooks;
