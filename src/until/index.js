import pathToRegexp from "path-to-regexp";

export const getSessionKey = (key, defaultValue) => {
    const item = window.sessionStorage.getItem(key);
    if(item == undefined && defaultValue != undefined) {
        return defaultValue;
    }
    return item;
}

export function getCurrentMenu(location, arrayMenu) {
    if (!!arrayMenu) {
        let current = []
        for (let i = 0; i < arrayMenu.length; i++) {
            const e = arrayMenu[i];
            const child = getCurrentMenu(location, e.children);
            if (!!child && child.length > 0) {
                child.push({ ...e, children: null });
                return child;
            }
            if (e.href && pathToRegexp(e.href).exec(location)) {
                current.push({ ...e, children: null });
                return current;
            }
        }
        return current;
    }
    return null;
}