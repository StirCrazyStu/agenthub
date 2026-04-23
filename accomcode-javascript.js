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

	// Work in progress - Testing dynamic template based approach so I can import header/footer.
	window.addEventListener('DOMContentLoaded', () => {
	  const TEMPLATE_BASE = 'https://www.domain.com/tpl-parts/';
	  const templateElements = document.querySelectorAll('[id^="template-"]');

	  templateElements.forEach(el => {
		const templateName = el.id.replace(/^template-/, '');
		const filePath = `${TEMPLATE_BASE}${templateName}.html`;

		fetch(filePath)
		  .then(response => {
			if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.status}`);
			return response.text();
		  })
		  .then(html => {
			el.innerHTML = html;
		  })
		  .catch(error => {
			console.error(`Error loading ${filePath}:`, error);
		  });
	  });
	});
