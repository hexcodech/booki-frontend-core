import { fetchApi } from "booki-frontend-core/utilities/rest";

import {
	isValidationError,
	addValidationError,
	clearValidationErrors
} from "booki-frontend-core/actions/validation";

import { addErrorNotification } from "booki-frontend-core/actions/notification";

export const invalidateClients = () => {
	return {
		type: "INVALIDATE_CLIENTS"
	};
};

const requestClients = (accessToken = "") => {
	return {
		type: "REQUEST_CLIENTS",
		accessToken
	};
};

const failClientsRequest = (error = {}) => {
	return {
		type: "FAIL_CLIENTS_REQUEST",
		error
	};
};

const receiveClients = (clients = [], receivedAt = 0) => {
	return {
		type: "RECEIVE_CLIENTS",
		clients,
		receivedAt
	};
};

const fetchClients = (accessToken = "") => {
	return dispatch => {
		dispatch(requestClients(accessToken));

		return fetchApi("oauth2/client", "GET", {}, accessToken)
			.then(clients => {
				dispatch(receiveClients(clients, Date.now()));
			})
			.catch(error => {
				dispatch(failClientsRequest(error));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

const shouldFetchClients = (state = {}) => {
	const clients = state.app.clients;

	for (let i = 0; i < clients.length; i++) {
		if (clients[i].isFetching) {
			return false;
		}

		if (clients[i].didInvalidate || clients[i].lastUpdated === 0) {
			return true;
		}
	}

	return clients.length === 0;
};

export const fetchClientsIfNeeded = (accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchClients(getState())) {
			return dispatch(fetchClients(accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateClient = (client = {}) => {
	return {
		type: "INVALIDATE_CLIENT",
		client
	};
};

export const clearNewClient = () => {
	return {
		type: "CLEAR_NEW_CLIENT"
	};
};

export const updateNewClient = (client = {}) => {
	return {
		type: "UPDATE_NEW_CLIENT",
		client
	};
};

const requestClient = (client = {}) => {
	return {
		type: "REQUEST_CLIENT",
		client
	};
};

const failClientRequest = (error = {}, client = {}) => {
	return {
		type: "FAIL_CLIENT_REQUEST",
		error,
		client
	};
};

const receiveClient = (client = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_CLIENT",
		client,
		receivedAt
	};
};

const fetchClient = (client = {}, accessToken = "") => {
	return dispatch => {
		dispatch(requestClient(client));

		return fetchApi("oauth2/client/" + client.id, "GET", {}, accessToken)
			.then(refreshedClient => {
				dispatch(receiveClient(refreshedClient, Date.now()));
			})
			.catch(error => {
				dispatch(failClientRequest(error));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

const shouldFetchClient = (state = {}, client = {}) => {
	if (client.isFetching) {
		return false;
	} else if (!client || !client.lastUpdated || client.lastUpdated === 0) {
		return true;
	} else {
		return client.didInvalidate;
	}
};

export const fetchClientIfNeeded = (client = {}, accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchClient(getState(), client)) {
			return dispatch(fetchClient(client, accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const updateClient = (client = {}) => {
	return {
		type: "UPDATE_CLIENT",
		client
	};
};

const putClient_ = (client = {}) => {
	return {
		type: "PUT_CLIENT",
		client
	};
};

const failClientPut = (error = {}, client = {}) => {
	return {
		type: "FAIL_CLIENT_PUT",
		error,
		client
	};
};

export const putClient = (client = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("client"));
		dispatch(putClient_(client));

		return fetchApi(
			"oauth2/client/" + client.id,
			"PUT",
			{ client },
			accessToken
		)
			.then(updatedClient => {
				dispatch(receiveClient(updatedClient, Date.now()));

				return updatedClient;
			})
			.catch(error => {
				dispatch(failClientPut(error, client));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}

				return Promise.reject(error);
			});
	};
};

const postClient_ = (client = {}) => {
	return {
		type: "POST_CLIENT",
		client
	};
};

const failClientPost = (error = {}, client = {}) => {
	return {
		type: "FAIL_CLIENT_POST",
		error,
		client
	};
};

export const postClient = (client = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("client"));

		dispatch(postClient_(client));

		return fetchApi("oauth2/client", "POST", { client }, accessToken)
			.then(savedClient => {
				dispatch(receiveClient(savedClient, Date.now()));

				return savedClient;
			})
			.catch(error => {
				dispatch(failClientPost(error, client));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}

				return Promise.reject(error);
			});
	};
};

const deleteClient_ = (client = {}) => {
	return {
		type: "DELETE_CLIENT",
		client
	};
};

const failClientDelete = (error = {}, client = {}) => {
	return {
		type: "FAIL_CLIENT_DELETE",
		error,
		client
	};
};

const deletedClient = (client = {}, success = false) => {
	return {
		type: "DELETED_CLIENT",
		client,
		success
	};
};

export const deleteClient = (client = {}, accessToken = "") => {
	return dispatch => {
		dispatch(deleteClient_(client));

		return fetchApi("oauth2/client/" + client.id, "DELETE", {}, accessToken)
			.then(response => {
				dispatch(deletedClient(client, response.success));

				if (!response.success) {
					failClientDelete("The API couldn't delete the client!", client);
				}

				return response.success;
			})
			.catch(error => {
				dispatch(failClientDelete(error, client));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};
