import {API_VERSION}			from 'constants/rest';
import {API_URL}				from 'config/rest';

export const fetchApi = (path = '/', method = 'GET', params = {}, accessToken = null, version = API_VERSION) => {
	
	return new Promise((resolve, reject) => {
		let http = new XMLHttpRequest();
	
		http.open(method, API_URL + (version ? '/v' + API_VERSION : '') + '/' + path, true);
		
		if(accessToken !== null){
			http.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		}
		
		http.onreadystatechange = () => {
			if(http.readyState === 4){
				if(http.status === 200){
					
					let data = JSON.parse(http.responseText);
					
					if(data.status && data.status != 200){
						reject(data);
					}else{
						resolve(
							data
						);
					}
				}else{
					reject('Error Code: ' + http.status);
				}
			}
		}
		
		http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		http.send(JSON.stringify(params));
		
	});
}