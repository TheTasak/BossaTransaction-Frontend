

const CSRFToken = (cookies: string) => {
    const splitCookies = cookies.split('; ');
    const csrfToken = splitCookies.find(cookie => cookie.startsWith("CSRF-TOKEN="));
    if (csrfToken === undefined) return "";

    return csrfToken.split('=')[1];
}

export default CSRFToken;