import BaseModel from './basemodel';
export default class BaseModel {
	constructor(data) {
		super(data);
	}
	constructor(data) {
		this.name = data.name;
		this.date = new Date();
	}
}
