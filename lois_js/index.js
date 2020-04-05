// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнена студентом группы 721701 БГУИР Коваленко Алексеем Васильевичем
// Проверить является ли формула СДНФ
// 24.02.2020
//
// https://learn.javascript.ru автор Коваленко Алексей
//
var symbols = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";

function isDis(str){
	let length = str.length + 1;
	while (length != str.length){
		length = str.length;
		str = str.replace(/\([A-Zc]&[A-Zc]\)|\(\(![A-Zc]\)&[A-Zc]\)|\([A-Zc]&\(![A-Zc]\)\)|\(\(![A-Zc]\)&\(![A-Zc]\)\)/g,"c")
		str = str.replace(/[c]\|[c]|\([d]\)\|[c]|[c]\|\([d]\)/g, "d")
	}
	console.log(str);
	if(str == "(d)" || str == "c")
		return true;
	else {
		console.log("isDis")
		return false;
	}
}

function str_to_set(con) {
	let set_con = new Set();
	con_list = con.split('&');
	for(c in con_list){
		if(set_con.has(con_list[c])){
			set_con.add('1');
		}
		set_con.add(con_list[c]);
	}
	return set_con;
}

function is_equal(set1, set2){
	for(let i of set1){
		if(!set2.has(i))
			return false;
	}
	for(let i of set2){
		if(!set1.has(i))
			return false;
	}
	return true;
}

function is_repeat(arr) {
	for(let i = 0; i < arr.length; i++) {
		for(let j = 0; j < arr.length; j++) {
			if(i != j){
				if (!is_equal(arr[i], arr[j]))
					return false;
			}
		}
	}
	return true;
}

function is_not_repeat(arr) {
	for(let i = 0; i < arr.length; i++) {
		for(let j = 0; j < arr.length; j++) {
			if(i != j){
				if (is_equal(arr[i], arr[j]))
					return false;
			}
		}
	}
	return true;
}

function isFormula(str){
	let length = str.length + 1;
	while (length > str.length){
		length = str.length;
		str = str.replace(/\([A-Zf](&|\|)[A-Zf]\)|\(![A-Zf]\)|[A-Zf]/g,"f")
	}
	console.log(str);
	if(str == "f")
		return true;
	else {
		console.log("isFormula")
		return false;
	}
}

function isOneSymbol(str){
	if(str.replace(/[A-Z]/,'').length == 0)
		return true;
	else if(str.replace(/\(![A-Z]\)/,'').length == 0)
		return true;
	else 
		return false;
}

function isTwoSymbol(str){
	for (let i = 0; i < symbols.length; i++){
		if(str.replace(new RegExp(symbols[i], 'g'), '').length + 2 == str.length)
			if (str.replace(/\([A-Z]\|\(![A-Z]\)\)|\(\(![A-Z]\)\|[A-Z]\)/,'').length == 0)
				return true;
	}
	return false;
}

function parse(str) {
	console.log(str);
	if(!isFormula(str))
	return false;
	if (str.replace('f', '') != str){
		return false;
	}
	if (isOneSymbol(str)){
		return true;
	}
	if(isTwoSymbol(str))
		return true;
	if(!isDis(str))
		return false;
	str_list = str.split('|');
	let big_list = new Array();
	let small_list = new Array();

	for (s in str_list){
		str_list[s] = str_list[s].replace(/\)/g, '').replace(/\(/g,'');
		big_list.push(str_to_set(str_list[s]));
		small_list.push(str_to_set(str_list[s].replace(/!/g,'')));
	}
	for (let big of big_list)
		console.log(big);
	for (let small of small_list)
		console.log(small);
	for (let i = 0; i < small_list.length; i++){
		if(small_list[i].has('1'))
		return false;
	}
	if(!is_repeat(small_list))
		return false;
	return is_not_repeat(big_list);
}

function write_answer(str){
	document.getElementById("lab").innerHTML = parse(str);
}

// ((((A&B)|(A&(!B)))|((!A)&(!B)))|((!A)&B))
