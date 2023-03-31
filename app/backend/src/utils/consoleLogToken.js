import Token from './Token';

const user = { id: 1, email: 'johndoe@example.com', role: 'admin' };
const token = new Token().genToken(user);

console.log(token);
