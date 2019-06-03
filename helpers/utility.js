

export function getTime(date) {
    var _date = new Date(date);
    return _date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export function objGetter(obj) {
    var _get = JSON.stringify(obj);
    return JSON.parse(_get);
}

export function capitalizeText(text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}