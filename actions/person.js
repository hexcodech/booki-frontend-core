import debounce
       from 'lodash/debounce';
import {fetchApi}
       from 'booki-frontend-core/utilities/rest';
import {isValidationError, addValidationError, clearValidationErrors}
       from 'booki-frontend-core/actions/validation';

import {addErrorNotification}
       from 'booki-frontend-core/actions/notification';

export const invalidatePeople = () => {
	return {
		type: 'INVALIDATE_PEOPLE'
	};
}

const requestPeople = (accessToken = {}) => {
	return {
		type: 'REQUEST_PEOPLE',
		accessToken
	};
}

const failPeopleRequest = (error = {}) => {
	return {
		type: 'FAIL_PEOPLE_REQUEST',
		error
	}
}

const receivePeople = (people = [], receivedAt = {}) => {
	return {
		type: 'RECEIVE_PEOPLE',
		people,
		receivedAt
	};
}

const fetchPeople = (accessToken = {}) => {
	return (dispatch) => {

		dispatch(
			requestPeople(accessToken)
		);

		return fetchApi('person', 'GET', {filter: {}}, accessToken)
		.then((people) => {

			dispatch(
				receivePeople(people, Date.now())
			);

		}).catch((error) => {

			dispatch(
				failPeopleRequest(error)
			);

     dispatch(
				addErrorNotification(error)
			);

		});
	};
}

const shouldFetchPeople = (state = {}) => {
	const people = state.app.people;

	for(let i=0;i<people.length;i++){

		if(people[i].isFetching){
			return false;
		}

		if(people[i].didInvalidate || people[i].lastUpdated === 0){
			return true;
		}
	}

	return people.length === 0;
}

export const fetchPeopleIfNeeded = (accessToken = {}) => {

	return (dispatch, getState) => {
		if(shouldFetchPeople(getState())){
			return dispatch(fetchPeople(accessToken));
		}else{
			return Promise.resolve();
		}
	}
}

export const invalidatePerson = (person = {}) => {
	return {
		type: 'INVALIDATE_PERSON',
		person
	};
}

export const clearNewPerson = () => {
	return {
		type: 'CLEAR_NEW_PERSON'
	};
}

export const updateNewPerson = (person = {}) => {
	return {
		type: 'UPDATE_NEW_PERSON',
		person
	};
}

const requestPerson = (person = {}) => {
	return {
		type: 'REQUEST_PERSON',
		person
	};
}

const failPersonRequest = (error = {}, person = {}) => {
	return {
		type: 'FAIL_PERSON_REQUEST',
		error,
		person
	};
}

const receivePerson = (person = {}, receivedAt = 0) => {
	return {
		type: 'RECEIVE_PERSON',
		person,
		receivedAt
	};
}

const fetchPerson = (person = {}, accessToken = 0) => {
	return (dispatch) => {

		dispatch(
			requestPerson(person)
		);

		return fetchApi('person/' + person.id, 'GET', {}, accessToken)
		.then((refreshedPerson) => {

			dispatch(
				receivePerson(refreshedPerson, Date.now())
			);

		}).catch((error) => {

			dispatch(
				failPersonRequest(error)
			);

			dispatch(
				addErrorNotification(error)
			);

		});
	};
};

const shouldFetchPerson = (state = {}, person = {}) => {

	if(person.isFetching){
		return false;
	}else if(!person || !person.lastUpdated || person.lastUpdated === 0){
		return true;
	}else{
		return person.didInvalidate;
	}
}

export const fetchPersonIfNeeded = (person = {}, accessToken = {}) => {

	return (dispatch, getState) => {
		if(shouldFetchPerson(getState(), person)){
			return dispatch(fetchPerson(person, accessToken));
		}else{
			return Promise.resolve();
		}
	}
}


const putPerson_ = (person = {}) => {
	return {
		type: 'PUT_PERSON',
		person
	};
}

const failPersonPut = (error = {}, person = {}) => {
	return {
		type: 'FAIL_PERSON_PUT',
		error,
		person
	};
}

const debouncedPut = debounce((dispatch, person = {}, accessToken = {}) => {

 dispatch(
   clearValidationErrors('person')
 );

	return fetchApi('person/' + person.id, 'PUT', {person}, accessToken)
	.then((updatedPerson) => {

		dispatch(
			receivePerson(updatedPerson, Date.now())
		);

		return updatedPerson;

	}).catch((error) => {

		dispatch(
			failPersonPut(error, person)
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

export const putPerson = (person = {}, accessToken = {}) => {
	return (dispatch) => {

		dispatch(
			putPerson_(person)
		);

		debouncedPut(dispatch, person, accessToken);

	};
}

const postPerson_ = (person = {}) => {
	return {
		type: 'POST_PERSON',
		person
	};
}

const failPersonPost = (error = {}, person = {}) => {
	return {
		type: 'FAIL_PERSON_POST',
		error,
		person
	};
}

export const postPerson = (person = {}, accessToken = {}) => {
	return (dispatch) => {

   dispatch(
     clearValidationErrors('person')
   );

		dispatch(
			postPerson_(person)
		);

		return fetchApi('person', 'POST', {person}, accessToken)
		.then((savedPerson) => {

			dispatch(
				receivePerson(savedPerson, Date.now())
			);

			return savedPerson;

		}).catch((error) => {

			dispatch(
				failPersonPost(error, person)
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

const deletePerson_ = (person = {}) => {
	return {
		type: 'DELETE_PERSON',
		person
	};
}

const deletedPerson = (person = {}, success = false) => {
	return {
		type: 'DELETED_PERSON',
		person,
		success
	};
}

const failPersonDelete = (error = {}, person = {}) => {
	return {
		type: 'FAIL_PERSON_DELETE',
		error,
		person
	};
}

export const deletePerson = (person = {}, accessToken = {}) => {
	return (dispatch) => {

		dispatch(
			deletePerson_(person)
		);

		return fetchApi('person/' + person.id, 'DELETE', {}, accessToken)
		.then((response) => {

			dispatch(
				deletedPerson(person, response.success)
			);

			if(!response.success){
				failPersonDelete('The API couldn\'t delete the person!', person)
			}

			return response.success;

		}).catch((error) => {

			dispatch(
				failPersonDelete(error, person)
			);

			dispatch(
				addErrorNotification(error)
			);

		});
	};
}



const lookUpPeople_ = (name) => {
	return {
		type: 'LOOKUP_PEOPLE',
    name
	};
};

const failPeopleLookup = (error = {}) => {
	return {
		type: 'FAIL_PEOPLE_LOOKUP',
		error
	};
};

const lookedUpPeople = (people = []) => {
	return {
		type: 'LOOKED_UP_PEOPLE',
		people
	};
};


export const debouncedLookup = debounce((dispatch, name, accessToken) => {
  dispatch(
    lookUpPeople_(name)
  );

  return fetchApi(
    'person/lookup?search=' + name,
    'GET',
    {},
    accessToken
  )
  .then((people) => {

    dispatch(
      lookedUpPeople(people)
    );

    return people;

  }).catch((error) => {

    dispatch(
      failPeopleLookup(error)
    );

    dispatch(
      addErrorNotification(error)
    );

  });
}, 300);

export const lookUpPeople = (name = '', accessToken = {}) => {
  return (dispatch) => {
    return debouncedLookup(dispatch, name, accessToken);
  };
}
