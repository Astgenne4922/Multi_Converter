function setInputFilter() {
	const inputFilter = v => /^\d*\.?\d*$/.test(v);

	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
		[...document.querySelectorAll("input[type='text']")].forEach(i =>
			i.addEventListener(event, function (e) {
				if (inputFilter(this.value) && Number.isFinite(Number.parseFloat(this.value))) {
					if (Number.parseFloat(this.oldValue) !== Number.parseFloat(this.value)) {
						convert(Number.parseFloat(this.value), e.path[0]);
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
			})
		);
	});
}

function selectChange() {
	let t = document.querySelector("input[type='text']");
	convert(t.value, t);
}

function convert(n, e) {
	let sels = [...document.querySelectorAll("select")];
	let base = Object.keys(currency)[sels[0].selectedIndex];
	let to = Object.keys(currency)[sels[1].selectedIndex];

	let texts = [...document.querySelectorAll("input[type='text']")];
	let textTo = texts.findIndex(i => i.isSameNode(e)) === 0 ? texts[1] : texts[0];

	if (document.querySelector("#Type").innerText === "Currency") {
		fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
			.then(res => res.json())
			.then(data => (textTo.value = data.rates[to] * n));
	} else {
		textTo.value = Number.parseFloat(math.evaluate(`${n} ${base} to ${to}`).toString().split(" ")[0]);
	}
}
