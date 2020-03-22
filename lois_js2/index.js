var symbols = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";

function replaceSymbols(str, arrOfSymbols, arr) {
	console.log(arr);
	let newStr = str;
	for (let i = 0; i < arrOfSymbols.length; i++) {
		newStr = newStr.replace(new RegExp(arrOfSymbols[i], 'g'), arr[i]);
	}
	console.log(newStr);
	let i = 0;
	while(newStr.length > 1) {
		newStr = newStr.replace(new RegExp("!1", 'g'), "0");
		newStr = newStr.replace(new RegExp("!0", 'g'), "1");

		newStr = newStr.replace(new RegExp("0\\&0", 'g'), "0");
		newStr = newStr.replace(new RegExp("0\\&1", 'g'), "0");
		newStr = newStr.replace(new RegExp("1\\&0", 'g'), "0");
		newStr = newStr.replace(new RegExp("1\\&1", 'g'), "1");

		newStr = newStr.replace(new RegExp("0\\|0", 'g'), "0");
		newStr = newStr.replace(new RegExp("0\\|1", 'g'), "1");
		newStr = newStr.replace(new RegExp("1\\|0", 'g'), "1");
		newStr = newStr.replace(new RegExp("1\\|1", 'g'), "1");

		newStr = newStr.replace(new RegExp("\\(0\\)", 'g'), "0");
		newStr = newStr.replace(new RegExp("\\(1\\)", 'g'), "1");

		i++;
	}
	console.log(newStr);	
	arr[arr.length - 1] = newStr;
}

function toBinaryString(str, number_of_var){
	while(str.length < number_of_var){
		str = '0' + str;
	}
	return str;
}

function arrOfTable(str){
	let arr = new Array();
	for (let i = 0; i < str.length; i++){
		if(symbols.includes(str[i])){
			symbols = symbols.replace(str[i], "");
			arr.push(str[i]);
		}
	}
	return arr;
}

function createArray(arr){
	let number_of_var = arr.length;
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
	for(let i = 0; i < col - 1; i++){
		table[0][i] = arr[i];
	}
	table[0][col - 1] = "";
	return table;
}

function createTable(table, arr){
	let cells = new Array();
	for(let i = 0; i < cells.length; i++){
		cells[i].remove();
	}
	for(let i = 0; i < arr.length; i++){
		let tr = document.createElement("tr");

		for(let j = 0; j < arr[i].length; j++){
			let td = document.createElement("td");
			td.innerHTML = arr[i][j];
			cells.push(tr.appendChild(td));
		}
		cells.push(table.appendChild(tr));
	}
}



function parse(str) {
	symbols = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
	str = str.replace(/\s+/g, '');
	let arrOfSymbols = arrOfTable(str);
	let arr = createArray(arrOfSymbols);
	for(let i = 1; i < arr.length; i++){
		replaceSymbols(str, arrOfSymbols, arr[i]);
	}
	let table = document.querySelector('#table');
	createTable(table, arr);	
}

function write_answer(str){
	parse(str);
}

// (A&B)|(A&!B)