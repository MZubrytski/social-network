export interface Profile {
  fullName: string;
  aboutMe: string | null;
  contacts: {
    facebook: string | null;
    website: string | null;
    github: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    mainLink: string | null;
    youtube: string | null;
  }
  photos: {
    small: string | null;
    large: string | null;
  },
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  userId: number;
}
