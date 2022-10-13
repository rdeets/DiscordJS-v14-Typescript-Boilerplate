import Mongoose from 'mongoose';

const Member = new Mongoose.Schema({
	_id: String,
	guild: {
		type: Map,
		of: {
			totalMessages: { type: Number, default: 0 },
			totalWarnings: { type: Number, default: 0 }
		}
	}
});

export default Mongoose.model('member', Member);

export type MemberType = Mongoose.Document<
	unknown,
	any,
	Mongoose.InferSchemaType<typeof Member>
> &
	Mongoose.InferSchemaType<typeof Member>;
