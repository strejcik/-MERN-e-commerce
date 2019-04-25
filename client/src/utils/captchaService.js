export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export function verify(captcha) {
    const requestOptions = {
        method: 'POST',
        headers: { 
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({captcha})
    };
    return fetch(`/api/v1/captcha/verify`, requestOptions).then(handleResponse);
}
