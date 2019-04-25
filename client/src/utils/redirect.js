import jwtdecode from 'jwt-decode';

export default function redirect(user) {
    if(!user) {
        return '/';
    }
    const decoded_user = jwtdecode(user);
    const adminPath = '/dashboard';
    const userPath = '/auth';
    if(decoded_user.account_type === 'user') {
        return userPath;
    } 
    if(decoded_user.account_type === 'admin') {
        return adminPath;
    }
    if(decoded_user.account_type === undefined || decoded_user.account_type === null) {
        return '/';
    }
    
}