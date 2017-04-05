import {fetchApi}
       from 'booki-frontend-core/utilities/rest';

import {addErrorNotification}
       from 'booki-frontend-core/actions/notification';

const lookUpPeople_ = () => {
	return {
		type: 'LOOKUP_PEOPLE'
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


export const lookUpPeople = (name = '', accessToken = {}) => {
	return (dispatch, getState) => {

		dispatch(
			lookUpPeople_()
		);

		//http specs don't allow bodies in get requests
		return fetchApi(
      'person/lookup?name=' + name,
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
	};
};
