import axios from 'axios';

export function request(path, method, data) {
	return axios({
		url: '/api' + path,
		method: method || 'GET',
		data: data || null,
	}).then((response) => {
		return response.data;
	});
}
