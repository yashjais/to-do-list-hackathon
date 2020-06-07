export const isLogin = () => {
    if (localStorage.getItem('authToDoToken')) {
        return true;
    }
    return false;
}