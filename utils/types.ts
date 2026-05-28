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

// Types for Global Data Structure
interface NavItem {
  id: number;
  href: string;
  lable: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: string | null;
}

interface ImageFormat {
  id: number;
  documentId: string;
  url: string;
}

export interface HeaderType {
  id: number;
  text: string | null;
  navItems: NavItem[];
  logo: {
    id: number;
    lable: string;
    href: string | null;
    isExternal: boolean;
    image: ImageFormat;
  };
}
//footers
interface SocialLink {
  id: number;
  lable: string;
  href: string;
  isExternal: boolean;
  image: ImageFormat;
}

export interface FooterType {
  id: number;
  text: string;
  logo: {
    id: number;
    lable: string;
    href: string;
    isExternal: boolean;
    image: ImageFormat;
  };
  socialLinks: SocialLink[];
}

export interface GlobalData {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  footer: FooterType;
  header: HeaderType;
}

//  Type for Newsletter Subscriber
export interface Subscriber {
  id: number;
  email: string;
  createdAt: Date;
}
