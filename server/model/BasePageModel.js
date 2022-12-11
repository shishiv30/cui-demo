import BaseModel from './basemodel';
import useragent from 'express-useragent';
const queryGroupKey = ['utm', 'hack'];
export default class BasePageModel extends BaseModel {
	constructor(data) {
		super({ name: data.name || 'BasePageModel' });

		this.data = {
			req: data.req,
			...this.getDataByReq(data.req),
		};
	}
	getDataByReq(req) {
		const data = {
			ua: useragent.parse(req.headers['user-agent']),
			queryData: this.getQueryData(req.query),
		};
	}
	getQueryData(query) {
		if (!query) return null;
		let queryData = {};
		for (const key in query) {
			let groupKey = key.split('_')[0];
			let index = queryGroupKey.indexOf(`${groupKey}`);
			if (index > -1) {
				let subGroupKey = key.split('_')[1];
				if (subGroupKey) {
					if (!queryData[groupKey]) {
						queryData[groupKey] = {};
					}
					queryData[groupKey][subGroupKey] = query[key];
				}
			} else {
				data[key] = query[key];
			}
		}
		return queryData;
	}
}
