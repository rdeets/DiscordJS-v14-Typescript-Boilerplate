import {
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder
} from 'discord.js';
import Guild from '../schemas/Guild';
import { CommandType } from '../typings/Command';

module.exports = {
	userPermissions: [PermissionFlagsBits.Administrator],
	data: new SlashCommandBuilder()
		.setName('links')
		.setDescription('Links')
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName('post')
				.setDescription('Post links')
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName('set-copy')
				.setDescription('use -- as line break. [title](https://link)--')
				.addStringOption((option) =>
					option
						.setName('copy')
						.setDescription('Message copy')
						.setRequired(true)
				)
		),
	async run({ interaction, args }) {
		if (interaction.isChatInputCommand()) {
			switch (interaction.options.getSubcommand()) {
				case 'post': {
					if (interaction.channel?.isTextBased()) {
						const links = (
							await Guild.findById(interaction.guildId)
						)?.links?.replaceAll('--', '\n');
						if (links)
							return await Promise.all<any>([
								interaction.deleteReply(),
								interaction.channel.send({
									embeds: [
										new EmbedBuilder()
											.setColor(0x00ffff)
											.setTitle('LINKS')
											.setDescription(links)
									]
								})
							]);
						else return await interaction.followUp('Error fetching links');
					}
					break;
				}

				case 'set-copy': {
					const copy = args.getString('copy')?.replaceAll('--', '\n');
					await Guild.findByIdAndUpdate(
						interaction.guildId,
						{ links: copy },
						{ upsert: true }
					);
					if (copy)
						await interaction.followUp({
							content: 'New links set: ',
							embeds: [
								new EmbedBuilder().setTitle('Links').setDescription(copy)
							]
						});
					else return await interaction.followUp('Error setting links');
					break;
				}
			}
		}
	}
} as CommandType;
