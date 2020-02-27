let output = 0;
let holder;
let amount = 0;
let operationType = '';
let operComplete;
let clickCount;
let scrLength;

function adjustScrSize() {
	/*NOTE: This fn needs to be improved to 
	adjust text limit and exponential notation*/
	holder = output.innerHTML;

	switch(true) {
		case (holder.length) == 8:
			output.style.fontSize = "62px";
			break;
		case (holder.length) == 9:
			output.style.fontSize = "55px";
			break;
		case (holder.length) == 10:
			output.style.fontSize = "49px";
			break;
		case (holder.length) == 11:
			output.style.fontSize = "45px";
			break;
		case (holder.length) == 12:
			output.style.fontSize = "41px";
			break;
		case (holder.length) == 13:
			output.style.fontSize = "38px";
			break;
		case (holder.length) == 14:
			output.style.fontSize = "35.3px";
			break;
		case (holder.length) == 15:
			output.style.fontSize = "33px";
			break;
		case (holder.length) == 16:
			output.style.fontSize = "31px";
			break;
		default:
			output.style.fontSize = "70px";
	}
}

function fn_numKeys(target, style) {
	if(style == true) {
		target.className += " pressedKey";
	}

	if(operComplete == true) {
		output.innerHTML =  target.innerHTML;
		operComplete = false;

	} else {
		output.innerHTML !== "0" &&
		!isNaN(output.innerHTML) ? 
		output.innerHTML += target.innerHTML :
		output.innerHTML =  target.innerHTML;
	}
}

function fn_operKeys(target, type, style) {
	if(style == true) {
		target.id == 107 ? target.className += " pressedKey2" :
		target.className += " pressedKey";
	}
 
	switch (type) {
		case "add":
		case "subtract":
		case "multiply":
		case "divide":
			if(!isNaN(output.innerHTML)) {
				clickCount == false ? 
				amount = Number(output.innerHTML) : equals();
			} 

			output.innerHTML = target.innerHTML;

			clickCount    = true;
			operComplete  = false;
			operationType = type;
			break;
		
		case "squareroot":
			if(!isNaN(output.innerHTML)) {
				amount = Number(output.innerHTML);	
				amount = Math.sqrt(amount);
				output.innerHTML = Number(Math.round(amount +'e2') +'e-2');
			} 

			operComplete  = true;
			operationType = type;
			break;

		case "decimal":
			if(!isNaN(output.innerHTML) && operComplete == false) {
				if(!output.innerHTML.includes('.')) {
					output.innerHTML == "0" ? 
					output.innerHTML = "0." :
					output.innerHTML += target.innerHTML;
				}
			} else { output.innerHTML = "0."; }
			
			operComplete = false;
			break;

		case "equals":
			output.innerHTML = equals();
			operComplete = true;
			clickCount = false;
			break;
		
		case "clear":
			output.innerHTML = 0;
			operComplete = false;
			operationType = "";
			amount = 0;
			break;

		case "erase":
			if (operComplete == false) {
				var trim = output.innerHTML;
				trim = trim.slice(0, trim.length - 1);
				output.innerHTML = trim;

				if(trim.length == 0) {
					output.innerHTML = 0; 
				}
			}
			break;
	}
}

function formatNumber(value) {
	if(!value.toString().includes('.')) {
		return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	} else {
		return value;
	}
}

function equals() {
	operationType = (isNaN(output.innerHTML) ||
	output.innerHTML == Infinity) ? 
	"invalid" : operationType;

	switch(operationType) {
		case "add":
			amount += Number(output.innerHTML);
			break;

		case "subtract":
			amount -= Number(output.innerHTML);
			break;

		case "multiply":
			amount *= Number(output.innerHTML);
			break;

		case "divide":
			const errMsg = "Math ERROR      ";

			amount /= Number(output.innerHTML);

			try {	
				if (amount === Infinity  || 
					amount === -Infinity ||
					isNaN(amount)) { throw errMsg; }
			} 
			catch (error) {
				amount = error;
			}
			break;

		case "invalid":
			amount = 0;
			break;
		default:
			amount = Number(output.innerHTML);
	}

	if(amount.toString().includes('.') &&
	!amount.toString().includes('e')) {
		amount = Number(Math.round(amount +'e2') +'e-2');
	}
	
	if(amount.toString().length >= 16 &&
	!isNaN(amount)) {
		amount = amount.toExponential(0);
	}

	return formatNumber(amount);
}

window.onload = function() {
	output       = document.getElementById('scrn');
	keys         = document.querySelector('.key-wrapper');
	operComplete = false;
	clickCount   = false;
	changed      = false;

	//Onload Default Scrn Output Value
	output.innerHTML = 0;
	
	keys.addEventListener('click', (event) => {
		const key     = event.target;
		const action  = key.dataset.action;
		const _length = output.innerHTML;

		if(key.matches('button')) {
			if(!action) {
				if(_length.length < 16) {
					fn_numKeys(key, false);
				}
			} 

			else {
				fn_operKeys(key, action, false);
			}
		}	
		adjustScrSize();
	});

	window.addEventListener('keyup', (event) => {
		var keyDown = event.keyCode || event.which;
	
		for (let k = 0; k < keys.children.length; k++) {
			var _child = keys.children[k].children;
	
			for(let j = 0; j < _child.length; j++) {
				
				if(keyDown != 107 && keyDown == _child[j].id) {
					_child[j].className = _child[j].className.replace(/ pressedKey/gi, "");
				} else {
					_child[j].className = _child[j].className.replace(/ pressedKey2/gi, "");
				}
			}
		}
	});
}

window.addEventListener('keydown', (event) => {
	var keyDown = event.keyCode || event.which;
	var _length = output.innerHTML;

	for (let k = 0; k < keys.children.length; k++) {
		var _child = keys.children[k].children;

		for(let j = 0; j < _child.length; j++) {

			if(keyDown == _child[j].id) {
				event.preventDefault();
	
				switch(keyDown) {
					case 96:
					case 97:
					case 98:
					case 99:
					case 100:
					case 101:
					case 102:
					case 103:
					case 104:
					case 105:
						if(_length.length < 16) {
							fn_numKeys(_child[j], true);
						}
						break;
	
					case 106:
					case 107:
					case 109:
					case 111:
					case 110:
					case 13:
					case 46:
					case 8:
						fn_operKeys(_child[j], _child[j].getAttribute('data-action'), true);		
						break;		
				}
			}
			adjustScrSize();
		}
	}
});
