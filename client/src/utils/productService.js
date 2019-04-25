let productService = {
	fetchProducts,
	postProduct,
    addToCart,
    getCart,
    removeFromCart,
    removeAllFromCart
};



export function logout() {
    localStorage.removeItem('user');
}


export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('user');
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

//Fetch products from DB
export function fetchProducts(url) {
    let options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    }
    return fetch(url, options).then(handleResponse);
}

//Post product to DB
export function postProduct(url, product) {
	let user = JSON.parse(localStorage.getItem('user'));
    let userToken = user.token;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken
        },
        body: JSON.stringify(product)
    }
    return fetch(url, options).then(handleResponse);
}

//Add item to cart session
export function addToCart(url, product) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    }
    return fetch(url, options).then(handleResponse);
}

//Remove item from cart session
export function removeFromCart(url, product) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({product})
    }
    return fetch(url, options).then(handleResponse);
}

//Get cart from cart session
export function getCart(url) {
    return fetch(url).then(handleResponse);
}

//Delete cart from session
export function removeAllFromCart(url) {
    let options = {
        method: "DELETE"
    }
    return fetch(url, options).then(handleResponse);
}


export default productService;