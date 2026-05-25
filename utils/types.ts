type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};
export type ResultRes = {
  success: boolean;
  error: string;
  user?: UserType | undefined;
};

//session type
export type SessionType = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user: UserType;
};
