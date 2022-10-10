import { SelectMenuBuilder, SelectMenuOptionBuilder } from 'discord.js';
import { SelectMenuType } from '../../typings/Component';

module.exports = {
	name: 'test-select-menu-id',
	selectMenu: new SelectMenuBuilder()
		.setPlaceholder('placeholder')
		.setCustomId('test-select-menu-id')
		.addOptions([
			new SelectMenuOptionBuilder()
				.setLabel('label')
				.setDescription('description')
				.setValue('value'),
			new SelectMenuOptionBuilder()
				.setLabel('label 2')
				.setDescription('description 2')
				.setValue('value 2')
		]),

	run: async ({ client, interaction }) => {
		await interaction.reply({
			content: interaction.values.join(),
			ephemeral: true
		});
	}
} as SelectMenuType;
