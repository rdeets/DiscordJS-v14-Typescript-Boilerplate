import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { ButtonType } from '../../typings/Component';

module.exports = {
	name: 'test-button-id',
	button: new ButtonBuilder()
		.setCustomId('test-button-id')
		.setStyle(ButtonStyle.Success)
		.setLabel('label'),
	run: async ({ client, interaction }) => {
		return await interaction.showModal(client.modals.get('test-modal-id').modal);
	}
} as ButtonType;
