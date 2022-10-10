import {
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	ContextMenuCommandBuilder,
	ContextMenuCommandInteraction,
	GuildMember,
	PermissionResolvable,
	SlashCommandBuilder
} from 'discord.js';
import { ExtendedClient } from '../structures/Client';

export interface ExtendedInteraction extends CommandInteraction {
	member: GuildMember;
}

export type CommandType = {
	userPermissions?: PermissionResolvable[];
	data: SlashCommandBuilder;
	run: (options: {
		client: ExtendedClient;
		interaction: ExtendedInteraction;
		args: CommandInteractionOptionResolver;
	}) => any;
} & ChatInputApplicationCommandData;

export type ContextMenuType = {
	userPermissions?: PermissionResolvable[];
	name: String;
	data: ContextMenuCommandBuilder;
	run: (options: {
		client: ExtendedClient;
		interaction: ContextMenuCommandInteraction;
	}) => any;
} & ChatInputApplicationCommandData;
