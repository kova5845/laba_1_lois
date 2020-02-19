
var yes_number = 0;
var no_number = 0;
answer = true;
var symbols = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";


function toBinaryString(str, number_of_var){
	while(str.length < number_of_var){
		str = '0' + str;
	}
	return str;
}

function arr_to_str(arr) {
	str = "(";
	for(let i = 0; i < arr.length - 1; i++){
		str += arr[i] + "&";
	}
	str += ")";
	str = str.replace("&)", ")");
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
	symbols = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
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
		table[0][i] = symbols[Math.floor(Math.random()*symbols.length)];
		symbols = symbols.replace(table[0][i], '');
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
		arr_str.push(arr_to_str(table[i]));
	}
	let formula = "";
	for(let i = 1; i < row; i++){
		if(table[i][col - 1] == 1)
			formula += arr_str[i - 1] + "|";
	}
	formula += "()";
	formula = formula.replace("|()", "");
	formula = error(formula);
	document.getElementById("formula").innerHTML = formula;
	answer = parse(formula);
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