document.getElementById('urlForm').addEventListener('submit', function(event) {
		event.preventDefault();
		  
		const url = document.getElementById('urlInput').value;
		const urlParams = new URLSearchParams(new URL(url).search);
		
		const packageId = urlParams.get('packageId');
		const productCode = urlParams.get('productCode');
		  
		let resultDiv = document.getElementById('result');
		  
		if (packageId && productCode && packageId.startsWith(productCode)) {
			const trimmed = packageId.slice(productCode.length);
			const accomCode = trimmed.slice(0, 8);
			resultDiv.textContent = `Atcom Code: ${accomCode}`;
			resultDiv.classList.remove('d-none', 'alert-danger');
			resultDiv.classList.add('alert-info');
		} else {
			resultDiv.textContent = 'Error: Could not extract accommodation code.';
			resultDiv.classList.remove('d-none', 'alert-info');
			resultDiv.classList.add('alert-danger');
		}
	});	
	
	document.getElementById('urlForm').addEventListener('reset', function() {
		let resultDiv = document.getElementById('result');
		resultDiv.textContent = '';
		resultDiv.classList.add('d-none');
		resultDiv.classList.remove('alert-danger', 'alert-info');
	});
