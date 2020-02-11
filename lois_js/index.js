
var symbol = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";

function isDis (str) {
	let answer = true;
	for (let i = 0; i < str.length - 2; i++) {
		if (str[i] == ')' && str[i + 2] == '(') {
			if (str[i + 1] != '|')
				answer = false;
		}
	}
	return answer;
}

function isCon (str) {
	let answer = true;
	for (let i = 0; i < str.length - 2; i++) {
		if (symbol.includes(str[i]) && (  symbol.includes(str[i+2]) || str[i+2] == '!'  )) {
			if (str[i + 1] != '&')
				answer = false;
		}
	}
	return answer;
}

function str_to_set(con) {
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

function parse(str) {

	let answer = true;
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
			return false;
		}

	}
	if (skobka_open != skobka_close)
		return false;

	answer = isDis(str);
	if(!answer)
		return false;

	let bigset = new Set();
	let i = 0;
	while (str.length != 0 || i < 5) {
		let first = str.includes('(');
		let second = str.includes(')');
		let con = str.substr(first, second - first + 1);
		answer = isCon(con);
		if(!answer)
			return false;
		bigset.add(str_to_set(con));
		str = str.substr(second - first + 1);
		if (str[0] == '|')
			str = str.substr(1);
		i++;
	}

	alert(answer);
	return answer;
}