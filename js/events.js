[...document.querySelectorAll("input[type='text']")].forEach(i => setInputFilter(i, v => /^\d*\.?\d*$/.test(v)));

function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
		textbox.addEventListener(event, function () {
            if (inputFilter(this.value) && Number.isFinite(Number.parseFloat(this.value))) {
				if (this.oldValue !== this.value) convert(Number.parseFloat(this.value));

				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			} else {
				this.value = "";
			}
		});
	});
}

function convert(n) {
	console.log(n);
}
