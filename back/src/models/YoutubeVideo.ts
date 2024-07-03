import { Schema, model } from 'mongoose';

export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: string | { videoId: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
}

const YouTubeVideoSchema = new Schema({
  kind: { type: String, required: true },
  etag: { type: String, required: true },
  id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  snippet: {
    publishedAt: { type: Date, required: true },
    channelId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    thumbnails: {
      default: {
        url: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
      medium: {
        url: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
      high: {
        url: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
      standard: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number },
      },
      maxres: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number },
      },
    },
    channelTitle: { type: String, required: true },
    categoryId: { type: String },
    liveBroadcastContent: { type: String },
    localized: {
      title: { type: String },
      description: { type: String },
    },
    defaultAudioLanguage: { type: String },
  },
});

export const YouTubeVideoModel = model<YouTubeVideo>('YouTubeVideo', YouTubeVideoSchema);
