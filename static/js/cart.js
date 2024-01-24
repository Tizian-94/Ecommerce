var updateBtns = document.getElementsByClassName('update-cart')

for (i = 0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', function(){
		var productId = this.dataset.product
		var action = this.dataset.action
		console.log('productId:', productId, 'Action:', action)
		console.log('USER:', user)

		if (user == 'AnonymousUser'){
			addCookieItem(productId, action)
		}else{
			updateUserOrder(productId, action)
		}
	})
}

function updateUserOrder(productId, action){
	console.log('User is authenticated, sending data...')

		var url = '/update_item/'

		fetch(url, {
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'X-CSRFToken':csrftoken,
			}, 
			body:JSON.stringify({'productId':productId, 'action':action})
		})
		.then((response) => {
		   return response.json();
		})
		.then((data) => {
		    location.reload()
		});
}

function addCookieItem(productId, action){
	console.log('User is not authenticated')

	if (action == 'add'){
		if (cart[productId] == undefined){
		cart[productId] = {'quantity':1}

		}else{
			cart[productId]['quantity'] += 1
		}
	}

	if (action == 'remove'){
		cart[productId]['quantity'] -= 1

		if (cart[productId]['quantity'] <= 0){
			console.log('Item should be deleted')
			delete cart[productId];
		}
	}
	console.log('CART:', cart)
	document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
	
	location.reload()
}

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    const isDarkModeSaved = localStorage.getItem('darkMode');
    if (isDarkModeSaved === 'true') {
        document.body.classList.add('dark-mode');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Handle view button click
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const productName = this.getAttribute('data-name');
        const productId = this.getAttribute('data-id');
		const descriptionElement = this.getAttribute('data-description');
        const modalTitle = document.getElementById('productModalLabel');
        const modalBody = document.querySelector('#productModal .modal-body');

        // Set modal title and body content
        modalTitle.innerText = productName;
		descriptionElement.innerText = descriptionElement;
        modalBody.innerHTML = `
			<h6><strong>${productName}</strong></h6>
			<hr>
			<p>${descriptionElement}</p>
			<button data-product="${productId}" data-action="add" class="btn btn-primary rounded add-btn update-cart">Add to Cart</button>
		`;
      });
    });

    // Handle close button inside the modal
    const closeButton = document.getElementById('closebtn');
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        // Close the modal
        $('#productModal').modal('hide');
      });
    }
  });