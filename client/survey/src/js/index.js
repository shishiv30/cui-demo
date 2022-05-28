import page from 'cui-jquery';
page();
import '../scss/index.scss';

let index = 0;
const history = [];
const template = {
	radio: function (setting) {
		var radios = setting.data.map((e) => {
			return `<label><input type="radio" name="${setting.name}" value="${e.value}"><span>${e.text}</span></label>`;
		});
		return `<div class="radio">${radios.join('')}</div>`;
	},
};
const data = {};
const config = {
	q0: {
		text: 'Q0',
		type: 'radio',
		name: 'q0',
		back: true,
		required: true,
		data: [
			{
				text: 'A0-1',
				value: 0,
			},
			{
				text: 'A0-2',
				value: 1,
			},
			{
				text: 'A0-3',
				value: 2,
			},
			{
				text: 'A0-4',
				value: 3,
			},
		],
		check: function ({ value }) {
			return value;
		},
		next: ['q1', 'q2', 'q3', 'q4'],
	},
	q1: {
		text: 'Q1',
		type: 'radio',
		back: true,
		required: true,
		name: 'q1',
		data: [
			{
				text: 'A1-1',
				value: 0,
			},
			{
				text: 'A1-2',
				value: 1,
			},
			{
				text: 'A1-3',
				value: 2,
			},
			{
				text: 'A1-4',
				value: 3,
			},
		],
		check: function ({ value }) {
			return 0;
		},
		next: ['end'],
	},
	q2: {
		text: 'Q2',
		type: 'radio',
		back: true,
		required: true,
		name: 'q2',
		data: [
			{
				text: 'A2-1',
				value: 0,
			},
			{
				text: 'A2-2',
				value: 1,
			},
			{
				text: 'A2-3',
				value: 2,
			},
			{
				text: 'A2-4',
				value: 3,
			},
		],
		check: function ({ value }) {
			return 0;
		},
		next: ['end'],
	},
	q3: {
		text: 'Q3',
		type: 'radio',
		back: true,
		required: true,
		name: 'q3',
		data: [
			{
				text: 'A3-1',
				value: 0,
			},
			{
				text: 'A3-2',
				value: 1,
			},
			{
				text: 'A3-3',
				value: 2,
			},
			{
				text: 'A3-4',
				value: 3,
			},
		],
		check: function ({ value }) {
			return 0;
		},
		next: ['end'],
	},
	q4: {
		text: 'Q4',
		type: 'radio',
		back: true,
		required: true,
		name: 'q4',
		data: [
			{
				text: 'A4-1',
				value: 0,
			},
			{
				text: 'A4-2',
				value: 1,
			},
			{
				text: 'A4-3',
				value: 2,
			},
			{
				text: 'A4-4',
				value: 3,
			},
		],
		check: function ({ value }) {
			return 0;
		},
		next: ['end'],
	},
	end: {
		text: 'ALl Done',
		type: 'radio',
		back: true,
		required: true,
		name: 'q4',
		data: [
			{
				text: 'End-1',
				value: 0,
			},
			{
				text: 'End-2',
				value: 1,
			},
			{
				text: 'End-3',
				value: 2,
			},
			{
				text: 'End-4',
				value: 3,
			},
		],
		check: function ({ value }) {
			return 0;
		},
		next: ['end'],
	},
};
const render = function (setting, value) {
	$('#title').html(setting.text);
	$('#form').html(template[setting.type](setting));
	$(`input[name='${setting.name}']`).val([value]);
	if (setting.back && index > 0) {
		$('#linkBack').removeAttr('disabled');
	} else {
		$('#linkBack').attr('disabled', 'disabled');
	}
	if (index < history.length) {
		$('#linkNext').removeAttr('disabled');
	} else {
		$('#linkNext').attr('disabled', 'disabled');
	}
	$('#progress').html(`${index} / ${history.length + 1}`);
	return;
};

//todo
let current = config['q0'];
render(current);
$('#linkBack').on('click', function () {
	index--;
	let ctx = history[index];
	current = config[ctx.name];
	render(current, ctx.value);
});
$('#linkNext').on('click', function () {
	let ctx = history[index];
	if (ctx && ctx.value) {
		current = config[current.next[ctx.value]];
	}
	index++;
	ctx = history[index];
	if (ctx && ctx.value) {
		render(current, ctx.value);
	} else {
		render(current);
	}
});
$('#form').on('change', 'input', function () {
	let value = $(this).val();
	value = /\d/.test(value) ? parseInt(value) : value;
	let ctx = { name: current.name, value: value };
	let i = current.check(ctx);
	data[current.name] = value;
	current = config[current.next[i]];
	if (history[index]) {
		history[index] = ctx;
		if (history[index + 1] && history[index + 1].name != current.name) {
			history[index + 1].value = undefined;
		}
	} else {
		history.push(ctx);
	}
	index++;
	render(current);
});
