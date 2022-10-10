import {
	ActionRowBuilder,
	SlashCommandBuilder,
	ButtonBuilder,
	EmbedBuilder,
	SelectMenuBuilder
} from 'discord.js';
import { CommandType } from '../typings/Command';

module.exports = {
	data: new SlashCommandBuilder().setName('help').setDescription('help'),
	async run({ interaction, client }) {
		if (interaction.isChatInputCommand()) {
			return await interaction.channel.send({
				embeds: [
					new EmbedBuilder()
						.setTitle('title')
						.setDescription('description')
				],
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents(
						client.buttons
							.get('test-button-id')
							.button.setLabel('new label')
					),
					new ActionRowBuilder<SelectMenuBuilder>().addComponents(
						client.selectMenus.get('test-select-menu-id').selectMenu
					)
				]
			});
		}
	}
} as CommandType;
