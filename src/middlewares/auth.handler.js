import { varEntorno } from '../config/config.js';

export function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  // if (apiKey === varEntorno.apiKey) {
  if (apiKey === '123') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
