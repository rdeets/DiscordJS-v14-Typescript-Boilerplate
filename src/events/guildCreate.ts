import Guild from '../schemas/Guild';
import { Event } from '../structures/Event';

export default new Event('guildCreate', async (guild) => {
	Guild.findByIdAndUpdate(guild.id, {}, { upsert: true });
});
