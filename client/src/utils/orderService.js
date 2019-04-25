let orderService = {
    postOrder
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
            return error;
        }
        return data;
    });
}

//Post order to DB
export function postOrder(url, order) {
    let userToken = JSON.parse(localStorage.getItem('user')).token;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(order)
    }
    return fetch(url, options).then(handleResponse);
}


export default orderService;