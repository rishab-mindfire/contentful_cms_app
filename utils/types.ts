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
