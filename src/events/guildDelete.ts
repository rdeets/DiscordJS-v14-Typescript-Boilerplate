import Guild from '../schemas/Guild';
import { Event } from '../structures/Event';

export default new Event('guildDelete', async (guild) => {
	await Guild.findByIdAndDelete(guild.id);
});
