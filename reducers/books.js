import { combineReducers } from "redux";

const books = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_BOOKS":
			return state.map(book => {
				return {
					...book,
					didInvalidate: true
				};
			});
		case "REQUEST_BOOKS":
			return state.map(book => {
				return {
					...book,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_BOOKS_REQUEST":
			return state.map(book => {
				return {
					...book,
					isFetching: false
				};
			});
		case "RECEIVE_BOOKS":
			return action.books.map(book => {
				return {
					...book,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_BOOK":
			return [
				...state.filter(book => {
					return book.id != action.book.id;
				}),
				{
					...action.book,
					didInvalidate: true
				}
			];

		case "REQUEST_BOOK":
		case "UPDATE_BOOK":
		case "PUT_BOOK":
			return [
				...state.filter(book => {
					return book.id != action.book.id;
				}),
				{
					...action.book,
					isFetching: true,
					didInvalidate: false
				}
			];

		case "DELETE_BOOK":
			return [
				...state.filter(book => {
					return book.id != action.book.id;
				})
			];

		case "FAIL_BOOK_REQUEST":
		case "FAIL_BOOK_PUT":
			return [
				...state.filter(book => {
					return book.id != action.book.id;
				}),
				{
					...action.book,
					isFetching: false
				}
			];

		case "FAIL_BOOK_DELETE":
			return [
				...state,
				{
					...action.book,
					isFetching: false,
					didInvalidate: false
				}
			];

		case "RECEIVE_BOOK":
			return [
				...state.filter(book => {
					return book.id != action.book.id;
				}),
				{
					...action.book,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];

		case "DELETED_BOOK":
			return state;

		default:
			return state;
	}
};

export default books;
