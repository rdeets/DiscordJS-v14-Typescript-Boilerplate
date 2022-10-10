import Mongoose from 'mongoose';

const Guild = new Mongoose.Schema({
	_id: String,
	schemaVersion: { type: Number, default: 1 },
	allowSwears: { type: Boolean, default: true },
	links: String
});

export default Mongoose.model('guild', Guild);

//Export document type, useful for passing document as an argument
export type GuildType = Mongoose.Document<
	unknown,
	any,
	Mongoose.InferSchemaType<typeof Guild>
> &
	Mongoose.InferSchemaType<typeof Guild>;
