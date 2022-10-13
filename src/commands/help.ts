import {
	ActionRowBuilder,
	SlashCommandBuilder,
	ButtonBuilder,
	EmbedBuilder,
	SelectMenuBuilder,
	MessageOptions
} from 'discord.js';
import { CommandType } from '../typings/Command';

module.exports = {
	data: new SlashCommandBuilder().setName('help').setDescription('help'),
	async run({ interaction, client }) {
		if (interaction.isChatInputCommand()) {
			const components: MessageOptions['components'] = [];
			const button = client.buttons
				.get('test-button-id')
				?.button.setLabel('new label');

			const selectMenu = client.selectMenus.get(
				'test-select-menu-id'
			)?.selectMenu;

			button &&
				components.push(
					new ActionRowBuilder<ButtonBuilder>().addComponents(button)
				);
			selectMenu &&
				components.push(
					new ActionRowBuilder<SelectMenuBuilder>().addComponents(selectMenu)
				);
			return await interaction.channel?.send({
				embeds: [
					new EmbedBuilder().setTitle('title').setDescription('description')
				],
				components
			});
		}
	}
} as CommandType;
