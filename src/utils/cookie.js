export function setCookie(name, value, expires) {
  const d = new Date();
  d.setTime(expires);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

export function getCookie(name) {
  const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return v ? v.pop() : '';
}

export function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/';
}

export function getCookieExpiry(name) {
  const key = `__expiry__${name}`;
  const raw = localStorage.getItem(key);
  return raw ? parseInt(raw, 10) : null;
}

export function setCookieWithExpiry(name, value, msFromNow) {
  const e = Date.now() + msFromNow;
  setCookie(name, value, e);
  localStorage.setItem(`__expiry__${name}`, e);
}

export function clearCookieExpiry(name){
  localStorage.removeItem(`__expiry__${name}`);
}
