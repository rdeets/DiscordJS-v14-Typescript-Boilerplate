import { SlashCommandBuilder } from 'discord.js';
import Guild from '../schemas/Guild';
import { CommandType } from '../typings/Command';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('swears')
		.setDescription('moderate swears in guild')
		.addBooleanOption((option) =>
			option
				.setName('swears')
				.setDescription('enable/disable swearing')
				.setRequired(true)
		),
	async run({ interaction, args }) {
		await Guild.findByIdAndUpdate(interaction.guildId, {
			allowSwears: args.getBoolean('swears')
		});
		return await interaction.followUp('swear settings set');
	}
} as CommandType;
