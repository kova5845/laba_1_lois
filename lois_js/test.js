// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнена студентом группы 721701 БГУИР Коваленко Алексеем Васильевичем
// Проверить является ли формула СДНФ
// 24.02.2020
//
// https://learn.javascript.ru автор Коваленко Алексей
//

var yes_number = 0;
var no_number = 0;
var symbols = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
var answer = true;


function toBinaryString(str, number_of_var){
	while(str.length < number_of_var){
		str = '0' + str;
	}
	return str;
}

function arr_to_str(arr, delimeter) {
	
	let str = ""
	for (let i = 0; i < arr.length - 1; i++){
		str += "(";
	}
	str += arr[0];
	for(let i = 1; i < arr.length; i++){
		str += delimeter + arr[i] + ")"
	}

	return str;
}

function error(formula) {
	if(Math.floor(Math.random()*2) == 0)
		return formula;
	else {
		formula = formula.replace(formula[Math.floor(Math.random()*formula.length)], symbols[Math.floor(Math.random()*symbols.length)]);
	}
	return formula;
}

function generate_formula() {
	symbol = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
	let number_of_var = Math.floor(Math.random()*3) + 2;
	let row = Math.pow(2, number_of_var) + 1;
	let col = number_of_var + 1;
	let table = new Array();
	for (let i = 0; i < row; i++){
	    table[i] = [];
	    for (let j = 0; j < col; j++)
	        table[i][j] = 0;
	}
	for (let i = 1; i < row; i++){
	    let str = (i - 1).toString(2);
	    str = toBinaryString(str, number_of_var);
	    for (let j = 0; j < col - 1; j++)
	        table[i][j] = parseInt(str[j], 10);
	}
	for (let i = 1; i < row; i++){
		table[i][col - 1] = Math.floor(Math.random()*2);
	}
	for(let i = 0; i < col; i++){
		table[0][i] = symbol[Math.floor(Math.random()*symbol.length)];
		symbol = symbol.replace(table[0][i], '');
	}
	for(let i = 1; i < row; i++){
		for(let j = 0; j < col - 1; j++){
			if (table[i][j] == 0)
				table[i][j] = "!" + table[0][j];
			else table[i][j] = table[0][j];
		}
	}
	let arr_str = new Array();
	for(let i = 1; i < row; i++){
		if(table[i][table[i].length - 1] == 1){
			table[i].pop()
			arr_str.push(arr_to_str(table[i], "&"));
		}
	}
	let formula = "";
	let i;
	formula = arr_to_str(arr_str, "|")
	fornula = formula.replace(/\s+/g,'');
	for(let i = 0; i < symbols.length; i++){
		let neg = "!" + symbols[i];
		formula = formula.replace(new RegExp(neg, 'g'), "(" + neg + ")")
	}
	formula = error(formula);
	document.getElementById("formula").innerHTML = formula;
	answer = parse(formula)
}

function yes () {
	if(answer){
		yes_number++;
		document.getElementById("yes").innerHTML = yes_number;
	}
	else {
		no_number++;
		document.getElementById("no").innerHTML = no_number;
	}
	generate_formula();
}

function no () {
	if(!answer){
		yes_number++;
		document.getElementById("yes").innerHTML = yes_number;
	}
	else {
		no_number++;
		document.getElementById("no").innerHTML = no_number;
	}
	generate_formula();
}