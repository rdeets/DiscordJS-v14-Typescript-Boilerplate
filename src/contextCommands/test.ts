import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import { ContextMenuType } from '../typings/Command';

module.exports = {
	name: 'test-context-id',
	data: new ContextMenuCommandBuilder()
		.setName('test')
		.setType(ApplicationCommandType.User),
	run: async ({ client, interaction }) => {
		return await interaction.channel.send(interaction.targetId);
	}
} as ContextMenuType;
