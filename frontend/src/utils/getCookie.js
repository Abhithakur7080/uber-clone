export function getCookie(name) {
    const cookieValues = document.cookie.split('; ');
    const cookieObject = {};
  
    cookieValues.forEach(cookie => {
      const [key, value] = cookie.split('=');
      cookieObject[key] = value;
    });
  
    return cookieObject[name] || null;
  }
  