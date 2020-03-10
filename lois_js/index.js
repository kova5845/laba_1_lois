// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнена студентом группы 721701 БГУИР Коваленко Алексеем Васильевичем
// Проверить является ли формула СДНФ
// 24.02.2020
//
// https://learn.javascript.ru автор Коваленко Алексей
//
var symbol = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";

function isDis (str) {
	// for (let i = 0; i < str.length; i++) {
	// 	if ( str[i] == ')' ) {
	// 		if ( i != str.length - 1 && str[i + 1] != '|' )
	// 			return = false;
	// 	}
	// 	if ( str[i] == '|' ) {
	// 		if ( str[i + 1] != '(' ) 
	// 			return = false;
	// 	}
	// }
	return /^\(!?[A-Z](&!?[A-Z])+\)(\|\(!?[A-Z](&!?[A-Z])+\))*$/.test(str);	
}

function isCon (str) {
	// for (let i = 0; i < str.length ; i++) {
	// 	if (str[i] == '('){
	// 		if ( !symbol.includes(str[i + 1]) && str[i + 1] != '!') {
	// 			return false;
	// 		}
	// 	}
	// 	if (str[i] == '!'){
	// 		if ( !symbol.includes(str[i + 1]) ) {
	// 			return false;
	// 		}
	// 	}
	// 	if ( symbol.includes(str[i]) ){
	// 		if ( str[i + 1] != ')' && str[i + 1] != '&') {
	// 			return false;
	// 		}
	// 	}
	// }
	if(str.replace(/\(!?[A-Z](&!?[A-Z])+\)/g,"") == "")
		return true
	else return false
}

function str_to_bigset(con) {
	let set_con = new Set();
	for (let i = 0; i < con.length; i++) {
		if (symbol.includes(con[i])) {
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
		if (symbol.includes(con[i])) {
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

// function sintacsis(str){
// 	let skobka_open = 0;
// 	let skobka_close = 0;
// 	for (let i = 0; i < str.length; i++) {
// 		if (str[i] == '(')
// 			skobka_open++;
// 		if (str[i] == ')')
// 			skobka_close++;
// 		if (str[i] != '(' && str[i] != ')' &&
// 			str[i] != '&' && str[i] != '|' && str[i] != '!' &&
// 			!symbol.includes(str[i])) {
// 			answer = false;
// 			break;
// 		}
// 	}
// 	if (skobka_open != skobka_close){
// 		answer = false;
// 		return answer;
// 	}
// }

function isFormula(str){
	let length = str.length + 1;
	while (length > str.length){
		length = str.length;
		str = str.replace(/\([A-Zf](&|\|)[A-Zf]\)|\(![A-Zf]\)|[A-Zf]/g,"f")
	}
	if(str == "f")
		return true
	else return false
}

function deleteSkobka(str){
	for(let i = 0; i < symbol.length; i++){
		let s = "\\(!" + symbol[i] + "\\)";
		str = str.replace(new RegExp(s, 'g'), "!" + symbol[i]);
	}
	str = str.replace(/\(+/g, '(');
	str = str.replace(/\)+/g, ')');
	return str;
}

function parse(str) {
	// str = str.replace(/\s+/g, '');
	if(!isFormula(str))
		return false;
	str = deleteSkobka(str);
	// sintacsis(str);
	if(!isDis(str))
		return false;
	str = str.replace(/\)\|\(/g, ")(");
	let bigset = new Array();
	let smallset = new Array();
	// let i = 5;
	while (str.length > 0) {
		let first = str.indexOf('(');
		let second = str.indexOf(')');
		let con = str.substr(first, second - first + 1);
		// if(isCon(con))
		// 	return false;
		bigset.push(str_to_bigset(con));
		smallset.push(str_to_smallset(con));
		str = str.substr(second - first + 1, str.length);
	}

	if(!is_repeat(smallset))
		return false;
	return is_not_repeat(bigset);
}

function write_answer(str){
	// let answer = parse(str);
	document.getElementById("lab").innerHTML = parse(str);
}

// (((A&B)|(A&(!B)))|((!A)&(!B)))
