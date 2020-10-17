function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
		textbox.addEventListener(event, function () {
			if (inputFilter(this.value) && Number.isFinite(Number.parseFloat(this.value))) {
				if (Number.parseFloat(this.oldValue) !== Number.parseFloat(this.value)) {
					convert(Number.parseFloat(this.value));
				}

				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;

				if (this.value.indexOf("0") === 0 && this.value.length > 1) this.value = this.value.substring(1);
			} else if (this.hasOwnProperty("oldValue")) {
				if (this.oldValue.length === 1 && this.value === "") this.value = "0";
				else {
					this.value = this.oldValue;
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				}
			} else {
				this.value = "";
			}
		});
	});
}

function convert(n) {
	let sels = [...document.querySelectorAll("select")];
	let base = Object.keys(currency)[sels[0].selectedIndex];
	let to = Object.keys(currency)[sels[1].selectedIndex];
	fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
		.then(res => res.json())
		.then(data => console.log(data.rates[to] * n));
}
