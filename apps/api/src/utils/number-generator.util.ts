export const generateRandomNumber = () => {
    return randomString(6, '1234567890');
}

const randomString = (length: number, chars: string) => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}