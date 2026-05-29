// interface for context
export interface GlobalContextValue {
  globalData: GlobalData;
  session: SessionType | null;
}

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

//login type
interface LoginType {
  id: number;
  mainText: string;
  secondaryText: string;
  EmailLabel: string;
  passwordlabel: string;
  namelabel: string;
  logoImage: ImageFormat;
}

export interface GlobalData {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  footer: FooterType;
  header: HeaderType;
  login: LoginType;
}

// --- Existing Base Interfaces ---

export interface ApiResponse {
  data: LandingPageData;
  meta: Record<string, unknown>;
}

export interface LandingPageData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: Block[];
}

// landing page
// --- Block Components ---
export interface ApiResponse {
  data: LandingPageData;
  meta: Record<string, unknown>;
}

export interface LandingPageData {
  id: number;
  blocks: Block[];
  // ... other fields
}

export type Block = HeroBlock | SectionHeadingBlock | CardGridBlock;

export interface HeroBlock {
  id: number;
  heading: string;
  text: string;
  links: LinkType[];
  image: { url: string; alternativeText: string | null };
  __component: 'blocks.hero';
}

export interface SectionHeadingBlock {
  id: number;
  heading: string;
  subHeading?: string;
  __component: 'blocks.section-heading';
}

export interface CardGridBlock {
  id: number;
  cards: { id: number; heading: string; text: string }[];
  __component: 'blocks.card-grid';
}

export interface LinkType {
  id: number;
  href: string;
  lable: string;
  type: 'PRIMARY' | 'SECONDARY';
}
