import debounce
       from 'lodash/debounce';
import {fetchApi}
       from 'booki-frontend-core/utilities/rest';

import {isValidationError, addValidationError, clearValidationErrors}
       from 'booki-frontend-core/actions/validation';

import {addErrorNotification}
       from 'booki-frontend-core/actions/notification';

export const invalidateConditions = () => {
	return {
		type: 'INVALIDATE_THUMBNAIL_TYPES'
	};
}

const requestConditions = (accessToken = {}) => {
	return {
		type: 'REQUEST_THUMBNAIL_TYPES',
		accessToken
	};
}

const failConditionsRequest = (error = {}) => {
	return {
		type: 'FAIL_THUMBNAIL_TYPES_REQUEST',
		error
	}
}

const receiveConditions = (thumbnailTypes = [], receivedAt = {}) => {
	return {
		type: 'RECEIVE_THUMBNAIL_TYPES',
		thumbnailTypes,
		receivedAt
	};
}

const fetchConditions = (accessToken = {}) => {
	return (dispatch) => {

		dispatch(
			requestConditions(accessToken)
		);

		return fetchApi('thumbnail-type', 'GET', {filter: {}}, accessToken)
		.then((thumbnailTypes) => {

			dispatch(
				receiveConditions(thumbnailTypes, Date.now())
			);

		}).catch((error) => {

			dispatch(
				failConditionsRequest(error)
			);

      dispatch(
				addErrorNotification(error)
			);

		});
	};
}

const shouldFetchConditions = (state = {}) => {
	const thumbnailTypes = state.app.thumbnailTypes;

	for(let i=0;i<thumbnailTypes.length;i++){

		if(thumbnailTypes[i].isFetching){
			return false;
		}

		if(thumbnailTypes[i].didInvalidate || thumbnailTypes[i].lastUpdated === 0){
			return true;
		}
	}

	return thumbnailTypes.length === 0;
}

export const fetchConditionsIfNeeded = (accessToken = {}) => {

	return (dispatch, getState) => {
		if(shouldFetchConditions(getState())){
			return dispatch(fetchConditions(accessToken));
		}else{
			return Promise.resolve();
		}
	}
}

export const invalidateCondition = (thumbnailType = {}) => {
	return {
		type: 'INVALIDATE_THUMBNAIL_TYPE',
		thumbnailType
	};
}

export const clearNewCondition = () => {
	return {
		type: 'CLEAR_NEW_THUMBNAIL_TYPE'
	};
}

export const updateNewCondition = (thumbnailType = {}) => {
	return {
		type: 'UPDATE_NEW_THUMBNAIL_TYPE',
		thumbnailType
	};
}

const requestCondition = (thumbnailType = {}) => {
	return {
		type: 'REQUEST_THUMBNAIL_TYPE',
		thumbnailType
	};
}

const failConditionRequest = (error = {}, thumbnailType = {}) => {
	return {
		type: 'FAIL_THUMBNAIL_TYPE_REQUEST',
		error,
		thumbnailType
	};
}

const receiveCondition = (thumbnailType = {}, receivedAt = 0) => {
	return {
		type: 'RECEIVE_THUMBNAIL_TYPE',
		thumbnailType,
		receivedAt
	};
}

const fetchCondition = (thumbnailType = {}, accessToken = 0) => {
	return (dispatch) => {

		dispatch(
			requestCondition(thumbnailType)
		);

		return fetchApi('thumbnailType/' + thumbnailType.id, 'GET', {}, accessToken)
		.then((refreshedCondition) => {

			dispatch(
				receiveCondition(refreshedCondition, Date.now())
			);

		}).catch((error) => {

			dispatch(
				failConditionRequest(error)
			);

			dispatch(
				addErrorNotification(error)
			);

		});
	};
};

const shouldFetchCondition = (state = {}, thumbnailType = {}) => {

	if(thumbnailType.isFetching){
		return false;
	}else if(!thumbnailType || !thumbnailType.lastUpdated || thumbnailType.lastUpdated === 0){
		return true;
	}else{
		return thumbnailType.didInvalidate;
	}
}

export const fetchConditionIfNeeded = (thumbnailType = {}, accessToken = {}) => {

	return (dispatch, getState) => {
		if(shouldFetchCondition(getState(), thumbnailType)){
			return dispatch(fetchCondition(thumbnailType, accessToken));
		}else{
			return Promise.resolve();
		}
	}
}


const putCondition_ = (thumbnailType = {}) => {
	return {
		type: 'PUT_THUMBNAIL_TYPE',
		thumbnailType
	};
}

const failConditionPut = (error = {}, thumbnailType = {}) => {
	return {
		type: 'FAIL_THUMBNAIL_TYPE_PUT',
		error,
		thumbnailType
	};
}

const debouncedPut = debounce((dispatch, thumbnailType = {}, accessToken = {}) => {

  dispatch(
    clearValidationErrors('thumbnailType')
  );

	return fetchApi('thumbnailType/' + thumbnailType.id, 'PUT', {thumbnailType}, accessToken)
	.then((updatedCondition) => {

		dispatch(
			receiveCondition(updatedCondition, Date.now())
		);

		return updatedCondition;

	}).catch((error) => {

		dispatch(
			failConditionPut(error, thumbnailType)
		);

    if(isValidationError(error)){
      dispatch(
        addValidationError(error)
      );
    }else{
      dispatch(
        addErrorNotification(error)
      );
    }

	});

}, 1000);

export const putCondition = (thumbnailType = {}, accessToken = {}) => {
	return (dispatch) => {

		dispatch(
			putCondition_(thumbnailType)
		);

		debouncedPut(dispatch, thumbnailType, accessToken);

	};
}

const postCondition_ = (thumbnailType = {}) => {
	return {
		type: 'POST_THUMBNAIL_TYPE',
		thumbnailType
	};
}

const failConditionPost = (error = {}, thumbnailType = {}) => {
	return {
		type: 'FAIL_THUMBNAIL_TYPE_POST',
		error,
		thumbnailType
	};
}

export const postCondition = (thumbnailType = {}, accessToken = {}) => {
	return (dispatch) => {

    dispatch(
      clearValidationErrors('thumbnailType')
    );

		dispatch(
			postCondition_(thumbnailType)
		);

		return fetchApi('thumbnail-type', 'POST', {thumbnailType}, accessToken)
		.then((savedCondition) => {

			dispatch(
				receiveCondition(savedCondition, Date.now())
			);

			return savedCondition;

		}).catch((error) => {

			dispatch(
				failConditionPost(error, thumbnailType)
			);

      if(isValidationError(error)){
        dispatch(
          addValidationError(error)
        );
      }else{
        dispatch(
  				addErrorNotification(error)
  			);
      }

		});
	};
}

const deleteCondition_ = (thumbnailType = {}) => {
	return {
		type: 'DELETE_THUMBNAIL_TYPE',
		thumbnailType
	};
}

const deletedCondition = (thumbnailType = {}, success = false) => {
	return {
		type: 'DELETED_THUMBNAIL_TYPE',
		thumbnailType,
		success
	};
}

const failConditionDelete = (error = {}, thumbnailType = {}) => {
	return {
		type: 'FAIL_THUMBNAIL_TYPE_DELETE',
		error,
		thumbnailType
	};
}

export const deleteCondition = (thumbnailType = {}, accessToken = {}) => {
	return (dispatch) => {

		dispatch(
			deleteCondition_(thumbnailType)
		);

		return fetchApi('thumbnailType/' + thumbnailType.id, 'DELETE', {}, accessToken)
		.then((response) => {

			dispatch(
				deletedCondition(thumbnailType, response.success)
			);

			if(!response.success){
				failConditionDelete('The API couldn\'t delete the thumbnailType!', thumbnailType)
			}

			return response.success;

		}).catch((error) => {

			dispatch(
				failConditionDelete(error, thumbnailType)
			);

			dispatch(
				addErrorNotification(error)
			);

		});
	};
}
