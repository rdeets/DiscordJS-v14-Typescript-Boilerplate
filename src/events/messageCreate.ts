import Guild from '../schemas/Guild';
import Member from '../schemas/Member';
import { Event } from '../structures/Event';
import { requiredPermissions, swears } from '../utils/vars';

export default new Event('messageCreate', async (message) => {
	//check if guild granted the necessary permissions
	const missingPermissions =
		(await message.guild?.members.fetchMe())?.permissions.missing(
			requiredPermissions
		)?.length || 0;
	if (
		message.author.bot ||
		message.channel.isDMBased() ||
		message.content.startsWith('/') ||
		missingPermissions > 0
	)
		return;

	const guildDatabase = await Guild.findById(message.guildId);

	//Swear moderation
	const swore = !guildDatabase?.allowSwears && swears.test(message.content);

	await Member.findByIdAndUpdate(
		message.author.id,
		{
			$inc: {
				[`guild.${message.guildId}.totalMessages`]: 1,
				[`guild.${message.guildId}.warnings`]: swore ? 1 : 0
			}
		},
		{ upsert: true }
	);

	swore &&
		(await Promise.all([
			message.delete(),
			message.channel.send(`${message.member} No swearing allowed`)
		]));
});
