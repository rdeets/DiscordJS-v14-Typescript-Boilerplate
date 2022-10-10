import {
	ApplicationCommandDataResolvable,
	Client,
	ClientEvents,
	Collection,
	GatewayIntentBits,
	Partials
} from 'discord.js';
import { CommandType, ContextMenuType } from '../typings/Command';
import glob from 'glob';
import { promisify } from 'util';
import { Event } from './Event';
import Mongoose from 'mongoose';
import { ButtonType, ModalType, SelectMenuType } from '../typings/Component';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
	commands: Collection<string, CommandType> = new Collection();
	selectMenus: Collection<string, SelectMenuType> = new Collection();
	contextCommands: Collection<string, ContextMenuType> = new Collection();
	modals: Collection<string, ModalType> = new Collection();
	buttons: Collection<string, ButtonType> = new Collection();
	commandCoolDown: Set<string> = new Set();

	constructor() {
		super({
			intents: [
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildInvites,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.MessageContent
			],
			partials: [
				Partials.Reaction,
				Partials.Message,
				Partials.User,
				Partials.Channel
			]
		});
	}

	async start() {
		this.registerModules();
		console.log('Logging in');

		let loggedIn = '';
		while (!loggedIn) {
			try {
				loggedIn = await this.login(process.env.botToken);
			} catch (error) {
				console.log('Failed to login. Trying again in 5 seconds');
				await new Promise((resolve) => setTimeout(resolve, 5000));
			}
		}
	}

	async importFile(filePath: string) {
		return (await import(filePath))?.default;
	}

	async databaseConnect() {
		Mongoose.connection.on('error', (err) => {
			console.log('Database Error: ', err);
		});

		let connected = false;
		while (!connected) {
			try {
				await Mongoose.connect(process.env.MongoConnectionString, {
					keepAlive: true,
					dbName: process.env.databaseName
				});
				connected = true;
			} catch (error) {
				console.log('Failed to connect to database. Trying again in 3 seconds');
				await new Promise((resolve) => setTimeout(resolve, 3000));
			}
		}
	}

	async registerButtons() {
		console.log('Registering buttons');
		const buttonFiles = await globPromise(
			`${__dirname}/../components/buttons/*{.ts,.js}`
		);
		buttonFiles.forEach(async (filePath) => {
			const button: ButtonType = await this.importFile(filePath);
			this.buttons.set(button.name, button);
		});
	}

	async registerModals() {
		console.log('Registering modals');
		const modalFiles = await globPromise(
			`${__dirname}/../components/modals/*{.ts,.js}`
		);
		modalFiles.forEach(async (filePath) => {
			const modal: ModalType = await this.importFile(filePath);
			this.modals.set(modal.name, modal);
		});
	}

	async registerSelectMenus() {
		console.log('Registering select menus');
		const selectMenuFiles = await globPromise(
			`${__dirname}/../components/selectMenus/*{.ts,.js}`
		);
		selectMenuFiles.forEach(async (filePath) => {
			const selectMenu: SelectMenuType = await this.importFile(filePath);
			this.selectMenus.set(selectMenu.name, selectMenu);
		});
	}

	async registerCommands(commands: ApplicationCommandDataResolvable[]) {
		this.application?.commands.set(commands);
		console.log('Registering global commands');
	}

	async registerModules() {
		// Commands
		console.log('Registering Modules');
		const commands: ApplicationCommandDataResolvable[] = [];
		const commandFiles = await globPromise(
			`${__dirname}/../commands/*{.ts,.js}`
		);
		commandFiles.forEach(async (filePath) => {
			const command: CommandType = await this.importFile(filePath);
			this.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
		});

		const contextCommandFiles = await globPromise(
			`${__dirname}/../contextCommands/*{.ts,.js}`
		);
		contextCommandFiles.forEach(async (filePath) => {
			const contextCommand: ContextMenuType = await this.importFile(filePath);
			this.contextCommands.set(contextCommand.name, contextCommand);
			commands.push(contextCommand.data.toJSON());
		});

		this.on('ready', async () => {
			await Promise.all([
				this.databaseConnect(),
				this.registerCommands(commands),
				this.registerButtons(),
				this.registerModals(),
				this.registerSelectMenus()
			]);

			this.user.setActivity(process.env.activity);
		});

		// Events
		const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
		eventFiles.forEach(async (filePath) => {
			const event: Event<keyof ClientEvents> = await this.importFile(filePath);
			this.on(event.event, async (...args) => {
				try {
					await event.run(...args);
				} catch (error) {
					console.log(error);
				}
			});
		});
	}
}
