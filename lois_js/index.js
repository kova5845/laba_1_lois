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

function str_to_bigset(con) {
	let set_con = new Set();
	for (let i = 0; i < con.length; i++) {
		if (symbols.includes(con[i])) {
			if (con[i - 1] == '!') {
				set_con.add(con.substr(i - 1, 2));
			}
			else set_con.add(con.substr(i, 1));
		}
	}

	return set_con;
}

function str_to_smallset(con) {
	let set_con = new Set();
	for (let i = 0; i < con.length; i++) {
		if (symbols.includes(con[i])) {
			set_con.add(con.substr(i, 1));
		}
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

function deleteSkobka(str){
	for(let i = 0; i < symbols.length; i++){
		for(let j = 0; j < str.length; j++){
			if(str[j] == '(' && str[j + 1] == '!' 
			&& str[j + 2] == symbols[i] && str[j + 3] == ')'){
				str = str.substring(0, j) + '!' + symbols[i] + str.substring(j + 4, str.length)
			}
		}
	}
	str = str.replace(/\(+/g, '(');
	str = str.replace(/\)+/g, ')');
	str = str.replace(/\)&|&\(/g, '&');
	return str;
}

function parse(str) {
	console.log(str);
	if (str.replace('f', '') != str){
		return false;
	}
	if(!isFormula(str))
		return false;
	if(!isDis(str))
		return false;
	str = deleteSkobka(str);
	console.log(str);
	str = str.replace(/\)\|\(/g, ")(");
	let bigset = new Array();
	let smallset = new Array();
	len = str.length + 1;
	while (str.length != len) {
		console.log(str);
		len = str.length;
		let first = str.indexOf('(');
		let second = str.indexOf(')');
		let con = str.substr(first, second - first + 1);
		if(str_to_bigset(con).size != 0)
			bigset.push(str_to_bigset(con));
		if(str_to_smallset(con).size != 0)
			smallset.push(str_to_smallset(con));
		str = str.substr(second - first + 1, str.length);
	}
	for (let big of bigset)
		console.log(big);
	for (let small of smallset)
		console.log(small);
	if(!is_repeat(smallset))
		return false;
	return is_not_repeat(bigset);
}

function write_answer(str){
	document.getElementById("lab").innerHTML = parse(str);
}

// ((((A&B)|(A&(!B)))|((!A)&(!B)))|((!A)&B))
