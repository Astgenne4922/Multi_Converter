function setInputFilter() {
	/* 
		Strings only pass if like:
		123
		12.
		12.345
	*/
	const inputFilter = v => /^\d*\.?\d*$/.test(v);

	/*
		Block every action that allows the user to insert an invalid charcter
		(Copy + Paste, ecc)
	*/
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
		[...document.querySelectorAll("input[type='text']")].forEach(i =>
			i.addEventListener(event, function (e) {
				if (inputFilter(this.value) && Number.isFinite(Number.parseFloat(this.value))) {
					/* 
						If the number as changed, convert it
					*/
					if (Number.parseFloat(this.oldValue) !== Number.parseFloat(this.value)) {
						convert(Number.parseFloat(this.value), e.path[0]);
					}

					this.oldValue = this.value;
					this.oldSelectionStart = this.selectionStart;
					this.oldSelectionEnd = this.selectionEnd;

					/*
						Check if there's a zero in front of the number since it's ugly with it
					*/
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

/*
	On unit change repeat the conversion
*/
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
		/*
			Using the Exchange Rates API to fetch the convertion values
		*/
		fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
			.then(res => res.json())
			.then(data => (textTo.value = data.rates[to] * n));
	} else {
		/*
			Using the library mathjs
			math.evaluate("(value) (baseUnit) to (convertionUnit)") == "(newValue) (convertionUnit)"
		*/
		textTo.value = Number.parseFloat(math.evaluate(`${n} ${base} to ${to}`).toString().split(" ")[0]);
	}
}
