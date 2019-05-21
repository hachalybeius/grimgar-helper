window.$ = (selector) => document.querySelector(selector)

window.$.ajax_ = (method, url, data) => {
	return new Promise((resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if(xhttp.readyState == XMLHttpRequest.DONE) {
				if(xhttp.status == 200) resolve(xhttp.responseText);
				else reject(xhttp.responseText);
			}
		}
		xhttp.open(method, url, true);
		xhttp.send(data);
	});
}

window.$.get_ = async (url, data) => await $.ajax_("GET", url, data);

window.$.sleep_ = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

window.$$ = (selector) => document.querySelectorAll(selector)