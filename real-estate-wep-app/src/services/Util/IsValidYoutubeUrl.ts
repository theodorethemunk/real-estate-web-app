export const isValidYouTubeUrl = (url: string) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
  };
