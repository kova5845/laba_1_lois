#include "Parser.h"
#include <iostream>
#include <string>
#include <set>


using namespace std;

string symbol = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";

bool isSymbol(char a) {
	return (symbol.find(a) < 0 && symbol.find(a) > 25) ? true : false;
}

bool isDis(string str) {
	bool answer = true;
	for (int i = 0; i < str.length() - 2; i++) {
		if (str[i] == ')' && str[i + 2] == '(') {
			if (str[i + 1] != '|')
				answer = false;
		}
	}
	return answer;
}

bool isCon(string str) {
	bool answer = true;
	for (int i = 0; i < str.length() - 2; i++) {
		if (isSymbol(str[i]) && (  isSymbol(str[i+2]) || str[i+2] == '!'  )) {
			if (str[i + 1] != '&')
				answer = false;
		}
	}
	return answer;
}

set<string> str_to_set(string con) {
	set<string> set_con;
	for (int i = 0; i < con.length(); i++) {
		if (symbol.find(con[i]) >= 0 && symbol.find(con[i]) <= 25) {
			if (con[i - 1] == '!') {
				set_con.insert(con.substr(i - 1, 2));
			}
			else set_con.insert(con.substr(i, 1));
		}
	}

	return set_con;
}

bool parse(string str) {

	bool answer = true;
	int skobka_open = 0;
	int skobka_close = 0;
	for (int i = 0; i < str.length(); i++) {
		if (str[i] == '(')
			skobka_open++;
		if (str[i] == ')')
			skobka_close++;
		if (str[i] != '(' && str[i] != ')' &&
			str[i] != '&' && str[i] != '|' && str[i] != '!' &&
			isSymbol(str[i])) {
			answer = false;
		}

	}
	if (skobka_open != skobka_close)
		answer = false;

	answer = isDis(str);

	set<string>* bigset = new set<string>[skobka_close];
	int i = 0;
	while (!str.empty()) {
		int first = str.find('(');
		int second = str.find(')');
		string con = str.substr(first, second - first + 1);
		answer = isCon(con);
		bigset[i] = str_to_set(con);
		str.erase(first, second - first + 1);
		if (str[0] == '|')
			str.erase(0, 1);
		i++;
	}


	return answer;
}



int main() {
	string str = "(A&B&C)|(A&!B&C)";
	cout << (parse(str));
	return 0;
}