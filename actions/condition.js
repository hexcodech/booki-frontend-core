import { fetchApi } from "booki-frontend-core/utilities/rest";

import {
	isValidationError,
	addValidationError,
	clearValidationErrors
} from "booki-frontend-core/actions/validation";

import { addErrorNotification } from "booki-frontend-core/actions/notification";

export const invalidateConditions = () => {
	return {
		type: "INVALIDATE_CONDITIONS"
	};
};

const requestConditions = (accessToken = "") => {
	return {
		type: "REQUEST_CONDITIONS",
		accessToken
	};
};

const failConditionsRequest = (error = {}) => {
	return {
		type: "FAIL_CONDITIONS_REQUEST",
		error
	};
};

const receiveConditions = (conditions = [], receivedAt = {}) => {
	return {
		type: "RECEIVE_CONDITIONS",
		conditions,
		receivedAt
	};
};

const fetchConditions = () => {
	return dispatch => {
		dispatch(requestConditions());

		return fetchApi("condition", "GET", {})
			.then(conditions => {
				dispatch(receiveConditions(conditions, Date.now()));
			})
			.catch(error => {
				dispatch(failConditionsRequest(error));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

const shouldFetchConditions = (state = {}) => {
	const conditions = state.app.conditions;

	for (let i = 0; i < conditions.length; i++) {
		if (conditions[i].isFetching) {
			return false;
		}

		if (conditions[i].didInvalidate || conditions[i].lastUpdated === 0) {
			return true;
		}
	}

	return conditions.length === 0;
};

export const fetchConditionsIfNeeded = () => {
	return (dispatch, getState) => {
		if (shouldFetchConditions(getState())) {
			return dispatch(fetchConditions());
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateCondition = (condition = {}) => {
	return {
		type: "INVALIDATE_CONDITION",
		condition
	};
};

export const clearNewCondition = () => {
	return {
		type: "CLEAR_NEW_CONDITION"
	};
};

export const updateNewCondition = (condition = {}) => {
	return {
		type: "UPDATE_NEW_CONDITION",
		condition
	};
};

const requestCondition = (condition = {}) => {
	return {
		type: "REQUEST_CONDITION",
		condition
	};
};

const failConditionRequest = (error = {}, condition = {}) => {
	return {
		type: "FAIL_CONDITION_REQUEST",
		error,
		condition
	};
};

const receiveCondition = (condition = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_CONDITION",
		condition,
		receivedAt
	};
};

const fetchCondition = (condition = {}, accessToken = 0) => {
	return dispatch => {
		dispatch(requestCondition(condition));

		return fetchApi("condition/" + condition.id, "GET", {}, accessToken)
			.then(refreshedCondition => {
				dispatch(receiveCondition(refreshedCondition, Date.now()));
			})
			.catch(error => {
				dispatch(failConditionRequest(error));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};

const shouldFetchCondition = (state = {}, condition = {}) => {
	if (condition.isFetching) {
		return false;
	} else if (
		!condition ||
		!condition.lastUpdated ||
		condition.lastUpdated === 0
	) {
		return true;
	} else {
		return condition.didInvalidate;
	}
};

export const fetchConditionIfNeeded = (condition = {}, accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchCondition(getState(), condition)) {
			return dispatch(fetchCondition(condition, accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const updateCondition = (condition = {}) => {
	return {
		type: "UPDATE_CONDITION",
		condition
	};
};

const putCondition_ = (condition = {}) => {
	return {
		type: "PUT_CONDITION",
		condition
	};
};

const failConditionPut = (error = {}, condition = {}) => {
	return {
		type: "FAIL_CONDITION_PUT",
		error,
		condition
	};
};

export const putCondition = (condition = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("condition"));
		dispatch(putCondition_(condition));

		return fetchApi(
			"condition/" + condition.id,
			"PUT",
			{ condition },
			accessToken
		)
			.then(updatedCondition => {
				dispatch(receiveCondition(updatedCondition, Date.now()));

				return updatedCondition;
			})
			.catch(error => {
				dispatch(failConditionPut(error, condition));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}

				return Promise.reject(error);
			});
	};
};

const postCondition_ = (condition = {}) => {
	return {
		type: "POST_CONDITION",
		condition
	};
};

const failConditionPost = (error = {}, condition = {}) => {
	return {
		type: "FAIL_CONDITION_POST",
		error,
		condition
	};
};

export const postCondition = (condition = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("condition"));

		dispatch(postCondition_(condition));

		return fetchApi("condition", "POST", { condition }, accessToken)
			.then(savedCondition => {
				dispatch(receiveCondition(savedCondition, Date.now()));

				return savedCondition;
			})
			.catch(error => {
				dispatch(failConditionPost(error, condition));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}

				return Promise.reject(error);
			});
	};
};

const deleteCondition_ = (condition = {}) => {
	return {
		type: "DELETE_CONDITION",
		condition
	};
};

const deletedCondition = (condition = {}, success = false) => {
	return {
		type: "DELETED_CONDITION",
		condition,
		success
	};
};

const failConditionDelete = (error = {}, condition = {}) => {
	return {
		type: "FAIL_CONDITION_DELETE",
		error,
		condition
	};
};

export const deleteCondition = (condition = {}, accessToken = "") => {
	return dispatch => {
		dispatch(deleteCondition_(condition));

		return fetchApi("condition/" + condition.id, "DELETE", {}, accessToken)
			.then(response => {
				dispatch(deletedCondition(condition, response.success));

				if (!response.success) {
					failConditionDelete(
						"The API couldn't delete the condition!",
						condition
					);
				}

				return response.success;
			})
			.catch(error => {
				dispatch(failConditionDelete(error, condition));

				dispatch(addErrorNotification(error));

				return Promise.reject(error);
			});
	};
};
