export const isLogin = () => {
    if (localStorage.getItem('authToken')) {
        return true;
    }
    return false;
}