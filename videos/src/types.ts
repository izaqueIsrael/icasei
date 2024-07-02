export interface YouTubeVideo {
    kind: string;
    etag: string;
    id: string | { videoId: string }; // Ajuste para considerar id como string ou objeto
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        high: {
          url: string;
          width: number;
          height: number;
        };
        standard?: {
          url: string;
          width: number;
          height: number;
        };
        maxres?: {
          url: string;
          width: number;
          height: number;
        };
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
  
  export interface AppProps {
    name: string;
    singleSpa: any;
    mountParcel: any;
    customProps: any;
  }