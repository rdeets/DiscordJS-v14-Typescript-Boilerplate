require('dotenv').config();
import { ExtendedClient } from './structures/Client';

export const client = new ExtendedClient();

console.log(
	'------DISCORD BOT------\n\n by Ryan Deets\n\nhttps://github.com/rdeets/\n'
);
client.start();
