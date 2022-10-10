import {
	ButtonBuilder,
	ButtonInteraction,
	ChatInputApplicationCommandData,
	ModalBuilder,
	ModalSubmitInteraction,
	SelectMenuBuilder,
	SelectMenuInteraction
} from 'discord.js';
import { ExtendedClient } from '../structures/Client';

export type ButtonType = {
	button: ButtonBuilder;
	run: (options: {
		client: ExtendedClient;
		interaction: ButtonInteraction;
	}) => any;
} & ChatInputApplicationCommandData;

export type ModalType = {
	modal: ModalBuilder;
	run: (options: {
		client: ExtendedClient;
		interaction: ModalSubmitInteraction;
	}) => any;
} & ChatInputApplicationCommandData;

export type SelectMenuType = {
	selectMenu: SelectMenuBuilder;
	run: (options: {
		client: ExtendedClient;
		interaction: SelectMenuInteraction;
	}) => any;
} & ChatInputApplicationCommandData;
