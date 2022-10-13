import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { ButtonType } from '../../typings/Component';

module.exports = {
	name: 'test-button-id',
	button: new ButtonBuilder()
		.setCustomId('test-button-id')
		.setStyle(ButtonStyle.Success)
		.setLabel('label'),
	run: async ({ client, interaction }) => {
		const modal = client.modals.get('test-modal-id');
		if (modal) return await interaction.showModal(modal.modal);
	}
} as ButtonType;
