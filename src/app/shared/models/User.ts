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

export interface AuthUser {
  email: string;
  id: number;
  login: string;
}
