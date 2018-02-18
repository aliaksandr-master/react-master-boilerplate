import pattern from './pattern';



export default (message = 'Invalid email format') => pattern(/^[a-z0-9+_.-]+@[a-z0-9_.-]+\.[a-z0-9_.-]{1,4}$/i, message);
