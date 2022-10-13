import {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle
} from 'discord.js';
import { ModalType } from '../../typings/Component';

module.exports = {
	name: 'test-modal-id',
	modal: new ModalBuilder()
		.setCustomId('test-modal-id')
		.setTitle('title')
		.addComponents(
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				new TextInputBuilder()
					.setCustomId('test-modal-text-input-id')
					.setLabel('label')
					.setStyle(TextInputStyle.Short)
			)
		),
	run: async ({ interaction }) => {
		return await interaction.followUp(
			interaction.fields.getTextInputValue('test-modal-text-input-id')
		);
	}
} as ModalType;
