import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Track } from './track.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Track.name })
  // track: Track;

  @Prop({ ref: 'Track' })
  track: mongoose.Schema.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
