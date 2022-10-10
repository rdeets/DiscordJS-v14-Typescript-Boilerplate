import Mongoose from 'mongoose';

const Member = new Mongoose.Schema({
	_id: String,
	//Map: guildID -> {  }
	guild: {
		type: Map,
		of: {
			totalMessages: { type: Number, default: 0 },
			totalWarnings: { type: Number, default: 0 }
		}
		// new Mongoose.Schema({
		// 	totalMessages: { type: Number, default: 0 },
		// 	totalWarnings: { type: Number, default: 0 }
		// }
		// ),
		// default: new Map<string, {}>()
	}
});

export default Mongoose.model('member', Member);

export type MemberType = Mongoose.Document<
	unknown,
	any,
	Mongoose.InferSchemaType<typeof Member>
> &
	Mongoose.InferSchemaType<typeof Member>;
