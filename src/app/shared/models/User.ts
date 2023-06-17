export interface User {
  id: number;
  name: string;
  photos: {
    small: string;
    large: string;
  },
  status: string;
  followed: boolean;
  unfollowed: boolean;
}
