import { store } from '../store/index';

const refreshToken = store => next => action => {
    switch(action.type) {
      case 'ON_INIT':
        action.token === undefined &&
        store.dispatch(next({
          type: 'REMOVE_EXISTING_TOKEN'
        })) && window.location.reload();

        fetch(`/api/v1/user/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.token)
        })
        .then((response) => {
            if(response.ok) {
                store.dispatch(next({
                  type: 'REMOVE_EXISTING_TOKEN'
                }));
            } else {
                localStorage.removeItem('user');
                window.location.reload();
                throw Error(response.statusText);
            }
            return response.json();
        }).then(res => {
            store.dispatch(next({
                type: 'RECEIVE_TOKEN',
                token: res
            }));
        });
        break;
      case 'RECEIVE_TOKEN':
          localStorage.setItem('user', JSON.stringify(action.token));
        break;
      case 'REMOVE_EXISTING_TOKEN':
          localStorage.removeItem('user');
        break;
    }
    return next(action);
  };

export default refreshToken;