#include <iostream>
#include <string>
#include <set>
#include "Parser.h"

using namespace std;

string symbol = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
set<string> str_to_set(string str);

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
			symbol.find(str[i]) < 0 && symbol.find(str[i]) > 25) {
			answer = false;
		}

	}
	if (skobka_open != skobka_close)
		answer = false;

	set<string>* bigset = new set<string>[skobka_close];
	int i = 0;
	while (!str.empty()) {
		int first = str.find('(');
		int second = str.find(')');
		string con = str.substr(first, second - first + 1);
		bigset[i] = str_to_set(con);
		str.erase(first, second - first + 1);
		if (str[0] == '|')
			str.erase(0, 1);
		i++;
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

int main() {
	string str = "(A&B&C)|(A&!B&C)";
	cout << (parse(str));
	return 0;
}