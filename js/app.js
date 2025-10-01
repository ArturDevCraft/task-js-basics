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

Calculator.prototype.add = function (num1, num2) {
	const val1 = parseFloat(num1.replace(',', '.'));
	const val2 = parseFloat(num2.replace(',', '.'));
	let result;
	if (
		val1 !== null &&
		val1 !== undefined &&
		!isNaN(val1) &&
		val2 !== null &&
		!isNaN(val2) &&
		val2 !== NaN
	) {
		result = val1 + val2;
		this.history.push(`${val1} + ${val2} = ${result}`);
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

		if (action === '+') {
			calc.add(number1, number2);
		}
	}
} while (calc.isCorrectAction(action));
