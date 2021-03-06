import { fetchApi } from "booki-frontend-core/utilities/rest";

import {
	isValidationError,
	addValidationError,
	clearValidationErrors
} from "booki-frontend-core/actions/validation";

import { addErrorNotification } from "booki-frontend-core/actions/notification";

export const invalidateBooks = () => {
	return {
		type: "INVALIDATE_BOOKS"
	};
};

const requestBooks = (accessToken = "") => {
	return {
		type: "REQUEST_BOOKS",
		accessToken
	};
};

const failBooksRequest = (error = {}) => {
	return {
		type: "FAIL_BOOKS_REQUEST",
		error
	};
};

const receiveBooks = (books = [], receivedAt = {}) => {
	return {
		type: "RECEIVE_BOOKS",
		books,
		receivedAt
	};
};

const fetchBooks = (accessToken = "") => {
	return dispatch => {
		dispatch(requestBooks(accessToken));

		return fetchApi("book", "GET", {}, accessToken)
			.then(books => {
				dispatch(receiveBooks(books, Date.now()));
			})
			.catch(error => {
				dispatch(failBooksRequest(error));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

const shouldFetchBooks = (state = {}) => {
	const books = state.app.books;

	for (let i = 0; i < books.length; i++) {
		if (books[i].isFetching) {
			return false;
		}

		if (books[i].didInvalidate || books[i].lastUpdated === 0) {
			return true; //if at least one invalidated or wasn't loaded yet, shouldFetchBooks is called -> update all
		}
	}

	return books.length === 0;
};

export const fetchBooksIfNeeded = (accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchBooks(getState())) {
			// Dispatch a thunk from thunk!
			return dispatch(fetchBooks(accessToken));
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve();
		}
	};
};

export const invalidateLatestBookOffers = () => {
	return {
		type: "INVALIDATE_LATEST_BOOK_OFFERS"
	};
};

const requestLatestBookOffers = () => {
	return {
		type: "REQUEST_LATEST_BOOK_OFFERS"
	};
};

const failLatestBookOffersRequest = (error = {}) => {
	return {
		type: "FAIL_LATEST_BOOK_OFFERS_REQUEST",
		error
	};
};

const receiveLatestBookOffers = (books = [], receivedAt = {}) => {
	return {
		type: "RECEIVE_LATEST_BOOK_OFFERS",
		books,
		receivedAt
	};
};

const shouldFetchLatestBookOffers = (state = {}) => {
	const books = state.app.latestBookOffers;

	for (let i = 0; i < books.length; i++) {
		if (books[i].isFetching) {
			return false;
		}

		if (books[i].didInvalidate || books[i].lastUpdated === 0) {
			return true;
		}
	}

	return books.length === 0;
};

const fetchLatestBookOffers = () => {
	return dispatch => {
		dispatch(requestLatestBookOffers());

		return fetchApi("book?filter[latestOffers]=true", "GET", {})
			.then(books => {
				dispatch(receiveLatestBookOffers(books, Date.now()));
			})
			.catch(error => {
				dispatch(failLatestBookOffersRequest(error));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

export const fetchLatestBookOffersIfNeeded = () => {
	return (dispatch, getState) => {
		if (shouldFetchLatestBookOffers(getState())) {
			return dispatch(fetchLatestBookOffers());
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateBook = (book = {}) => {
	return {
		type: "INVALIDATE_BOOK",
		book
	};
};

export const clearNewBook = () => {
	return {
		type: "CLEAR_NEW_BOOK"
	};
};

export const updateNewBook = (book = {}) => {
	return {
		type: "UPDATE_NEW_BOOK",
		book
	};
};

const requestBook = (book = {}) => {
	return {
		type: "REQUEST_BOOK",
		book
	};
};

const failBookRequest = (error = {}, book = {}) => {
	return {
		type: "FAIL_BOOK_REQUEST",
		error,
		book
	};
};

const receiveBook = (book = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_BOOK",
		book,
		receivedAt
	};
};

const fetchBook = (book = {}) => {
	return dispatch => {
		dispatch(requestBook(book));

		return fetchApi("book/" + book.id, "GET", {})
			.then(refreshedBook => {
				dispatch(receiveBook(refreshedBook, Date.now()));
			})
			.catch(error => {
				dispatch(failBookRequest(error));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

const shouldFetchBook = (state = {}, book = {}) => {
	if (book.isFetching) {
		return false;
	} else if (!book || !book.lastUpdated || book.lastUpdated === 0) {
		return true;
	} else {
		return book.didInvalidate;
	}
};

export const fetchBookIfNeeded = (book = {}) => {
	return (dispatch, getState) => {
		if (shouldFetchBook(getState(), book)) {
			// Dispatch a thunk from thunk!
			return dispatch(fetchBook(book));
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve();
		}
	};
};

export const updateBook = (book = {}) => {
	return {
		type: "UPDATE_BOOK",
		book
	};
};

const putBook_ = (book = {}) => {
	return {
		type: "PUT_BOOK",
		book
	};
};

const failBookPut = (error = {}, book = {}) => {
	return {
		type: "FAIL_BOOK_PUT",
		error,
		book
	};
};

export const putBook = (book = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("book"));
		dispatch(putBook_(book));

		return fetchApi("book/" + book.id, "PUT", { book }, accessToken)
			.then(updatedBook => {
				dispatch(receiveBook(updatedBook, Date.now()));

				return updatedBook;
			})
			.catch(error => {
				dispatch(failBookPut(error, book));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}

				return Promise.reject(error);
			});
	};
};

const postBook_ = (book = {}) => {
	return {
		type: "POST_BOOK",
		book
	};
};

const failBookPost = (error = {}, book = {}) => {
	return {
		type: "FAIL_BOOK_POST",
		error,
		book
	};
};

export const postBook = (book = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("book"));

		dispatch(postBook_(book));

		return fetchApi("book", "POST", { book }, accessToken)
			.then(savedBook => {
				dispatch(receiveBook(savedBook, Date.now()));

				return savedBook;
			})
			.catch(error => {
				dispatch(failBookPost(error, book));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}

				return Promise.reject(error);
			});
	};
};

const deleteBook_ = (book = {}) => {
	return {
		type: "DELETE_BOOK",
		book
	};
};

const deletedBook = (book = {}, success = false) => {
	return {
		type: "DELETED_BOOK",
		book,
		success
	};
};

const failBookDelete = (error = {}, book = {}) => {
	return {
		type: "FAIL_BOOK_DELETE",
		error,
		book
	};
};

export const deleteBook = (book = {}, accessToken = "") => {
	return dispatch => {
		dispatch(deleteBook_(book));

		return fetchApi("book/" + book.id, "DELETE", {}, accessToken)
			.then(response => {
				dispatch(deletedBook(book, response.success));

				if (!response.success) {
					failBookDelete("The API couldn't delete the book!", book);
				}

				return response.success;
			})
			.catch(error => {
				dispatch(failBookDelete(error, book));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

const lookUpBooks_ = (where = false, accessToken = "") => {
	return {
		type: "LOOKUP_BOOKS",
		where,
		accessToken
	};
};

const failBookLookup = (error = {}, where = false) => {
	return {
		type: "FAIL_BOOK_LOOKUP",
		error,
		where
	};
};

const lookedUpBooks = (books = [], where = false) => {
	return {
		type: "LOOKED_UP_BOOKS",
		books,
		where
	};
};

export const lookUpBooks = (search = "", where = "local", accessToken = "") => {
	return dispatch => {
		dispatch(lookUpBooks_(where, accessToken));

		let promises = [];

		if (where === "all" || where === "external") {
			promises.push(
				fetchApi(
					"book/lookup/external?search=" + search,
					"GET",
					{},
					accessToken
				)
			);
		}

		if (where === "all" || where === "local") {
			promises.push(
				fetchApi("book/lookup?search=" + search, "GET", {}, accessToken)
			);
		}

		return Promise.all(promises)
			.then(books => {
				books = [].concat.apply([], books);

				dispatch(lookedUpBooks(books, where));

				return books;
			})
			.catch(error => {
				dispatch(failBookLookup(error, where));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};
