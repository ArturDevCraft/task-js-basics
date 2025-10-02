function Calculator() {
	this.actions = {
		'+': this.add,
		'-': this.substract,
		'*': this.multiply,
		'/': this.divide,
		'^': this.power,
	};
	this.history = [];
}

Calculator.prototype.isCorrectAction = function (action) {
	return Object.keys(this.actions).includes(action);
};

Calculator.prototype.getHistoryAsString = function () {
	return this.history.join('\n');
};

Calculator.prototype.isCorrectNumber = function (num) {
	if (num !== null && num !== undefined && !isNaN(num)) {
		return true;
	} else {
		return false;
	}
};

Calculator.prototype.addToHistory = function (val1, val2, result, action) {
	this.history.push(`${val1} ${action} ${val2} = ${result}`);
};

Calculator.prototype.add = function (val1, val2) {
	return val1 + val2;
};

Calculator.prototype.substract = function (val1, val2) {
	return val1 - val2;
};

Calculator.prototype.multiply = function (val1, val2) {
	return val1 * val2;
};

Calculator.prototype.divide = function (val1, val2) {
	return val1 / val2;
};

Calculator.prototype.power = function (base, exponent) {
	let i = 1;
	result = base;

	if (exponent === 0) {
		result = 1;
	} else if (exponent < 0) {
		i = -1;
		while (i > exponent) {
			result *= base;
			i--;
		}
		result = 1 / result;
	} else {
		while (i < exponent) {
			result *= base;
			i++;
		}
	}

	return result;
};

Calculator.prototype.operation = function (num1, num2, action) {
	const val1 = parseFloat(num1.replace(',', '.'));
	const val2 = parseFloat(num2.replace(',', '.'));
	let result;

	if (this.isCorrectNumber(val1) && this.isCorrectNumber(val2)) {
		const actionFunc = this.actions[action];

		if (typeof actionFunc === 'function') {
			result = actionFunc(val1, val2);
			this.addToHistory(val1, val2, result, action);
		}
	} else {
		return null;
	}

	return result;
};

const calc = new Calculator();
let action, promptContent, isCorrectAction, number1, number2;
do {
	promptContent =
		'Podaj jaką operację chcesz wykonać (+, -, *, /, ^) i potwierdź. \n'; // \n - znak nowej linii
	promptContent += 'Jeśli chcesz zrezygnować wciśnij Anuluj. \n';
	promptContent += 'Lista poprzednich operacji: \n' + calc.getHistoryAsString();

	action = prompt(promptContent);
	isCorrectAction = calc.isCorrectAction(action);
	if (isCorrectAction) {
		number1 = prompt('Podaj liczbę nr 1');
		number2 = prompt('Podaj liczbę nr 2');

		calc.operation(number1, number2, action);
	}
} while (calc.isCorrectAction(action));
