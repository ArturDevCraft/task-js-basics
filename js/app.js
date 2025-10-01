function Calculator() {
	this.actions = ['+', '-', '*', '/', '^'];
	this.history = [];
}

Calculator.prototype.isCorrectAction = function (action) {
	return this.actions.includes(action);
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
	switch (action) {
		case '+':
			this.history.push(`${val1} + ${val2} = ${result}`);
			break;
		case '-':
			this.history.push(`${val1} - ${val2} = ${result}`);
			break;
		case '*':
			this.history.push(`${val1} * ${val2} = ${result}`);
			break;
		case '/':
			this.history.push(`${val1} / ${val2} = ${result}`);
			break;
		case '^':
			this.history.push(`${val1} ^ ${val2} = ${result}`);
			break;
	}
};

Calculator.prototype.operation = function (num1, num2, action) {
	const val1 = parseFloat(num1.replace(',', '.'));
	const val2 = parseFloat(num2.replace(',', '.'));
	let result;

	if (this.isCorrectNumber(val1) && this.isCorrectNumber(val2)) {
		switch (action) {
			case '+':
				result = val1 + val2;
				break;
			case '-':
				result = val1 - val2;
				break;
			case '*':
				result = val1 * val2;
				break;
			case '/':
				result = val1 / val2;
				break;
			case '^':
				let i = 1;
				result = val1;

				if (val2 === 0) {
					result = 1;
				} else if (val2 < 0) {
					i = -1;
					while (i > val2) {
						result *= val1;
						i--;
					}
					result = 1 / result;
				} else {
					while (i < val2) {
						result *= val1;
						i++;
					}
				}
				break;
		}

		this.addToHistory(val1, val2, result, action);
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
