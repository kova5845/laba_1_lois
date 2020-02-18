
var symbol = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
var answer = true;

function isDis (str) {
	for (let i = 0; i < str.length; i++) {
		if ( str[i] == ')' ) {
			if ( i != str.length - 1 && str[i + 1] != '|' )
				answer = false;
		}
		if ( str[i] == '|' ) {
			if ( str[i + 1] != '(' ) 
				answer = false;
		}
	}
}

function isCon (str) {
	for (let i = 0; i < str.length ; i++) {
		if (str[i] == '('){
			if ( !symbol.includes(str[i + 1]) && str[i + 1] != '!') {
				answer = false;
			}
		}
		if (str[i] == '!'){
			if ( !symbol.includes(str[i + 1]) ) {
				answer = false;
			}
		}
		if ( symbol.includes(str[i]) ){
			if ( str[i + 1] != ')' && str[i + 1] != '&') {
				answer = false;
			}
		}
	}
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
					answer = false;
			}
		}
	}
}

function is_not_repeat(arr) {
	for(let i = 0; i < arr.length; i++) {
		for(let j = 0; j < arr.length; j++) {
			if(i != j){
				if (is_equal(arr[i], arr[j]))
					answer = false;
			}
		}
	}
}

function parse(str) {
	answer = true;

	str = str.replace(/\s+/g, '');
	let skobka_open = 0;
	let skobka_close = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] == '(')
			skobka_open++;
		if (str[i] == ')')
			skobka_close++;
		if (str[i] != '(' && str[i] != ')' &&
			str[i] != '&' && str[i] != '|' && str[i] != '!' &&
			!symbol.includes(str[i])) {
			answer = false;
			break;
		}
	}
	if (skobka_open != skobka_close){
		answer = false;
		document.getElementById("lab").innerHTML = answer;
		return answer;
	}

	isDis(str);

	let bigset = new Array();
	let smallset = new Array();
	let i = 0;
	while (str.length > 0) {
		let first = str.indexOf('(');
		let second = str.indexOf(')');
		let con = str.substr(first, second - first + 1);
		isCon(con);
		bigset.push(str_to_bigset(con));
		smallset.push(str_to_smallset(con));
		str = str.substr(second - first + 1, str.length);
		if (str[0] == '|')
			str = str.substr(1);
		i++;
	}

	is_repeat(smallset);
	is_not_repeat(bigset);

	document.getElementById("lab").innerHTML = answer;
	//alert(answer);
	return answer;
}


// (A&B)|(A&!B)