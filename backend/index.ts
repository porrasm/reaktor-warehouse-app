import dotenv from 'dotenv'
dotenv.config()

import createServer from './server';

console.log('Started application')

createServer()