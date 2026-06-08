import { type BlocksContent } from '@strapi/blocks-react-renderer';

// interface for context
export interface GlobalContextValue {
  globalData: GlobalData;
  session: SessionType | null;
  isDbDown: boolean;
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
  CenterTextBlock?: [
    {
      type: 'paragraph';
      children: [{ type: 'text'; text: string }];
    },
  ];
}

//login type
export interface LoginType {
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

//landing page :--
// --- Base Shared Types ---

export interface Image {
  id: number;
  documentId: string;
  alternativeText: string | null;
  url: string;
}

export interface LinkType {
  id: number;
  href: string;
  lable: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: 'PRIMARY' | 'SECONDARY';
}

// Rich Text / Content Node structure
export interface ContentNode {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

// --- Block Component Types ---

export interface HeroBlock {
  __component: 'blocks.hero';
  id: number;
  heading: string;
  text: string;
  links: LinkType[];
  image: Image;
}

export interface SectionHeadingBlock {
  __component: 'blocks.section-heading';
  id: number;
  heading: string;
  subHeading: string;
}

export interface Card {
  id: number;
  heading: string;
  text: string;
}

export interface CardGridBlock {
  __component: 'blocks.card-grid';
  id: number;
  cards: Card[];
}

export interface ContentWithImageBlock {
  __component: 'blocks.component-content-with-image';
  id: number;
  reversed: boolean;
  heading: string;
  content: BlocksContent;
  image: Image;
  link: LinkType | null;
}

export interface MarkdownBlock {
  __component: 'blocks.markdown';
  id: number;
  content: ContentNode[];
}

export interface PersonCardBlock {
  __component: 'blocks.person-card';
  id: number;
  aboutPerson: string;
  personName: string;
  personJob: string;
  image: Image;
}

export interface FAQItem {
  id: number;
  heading: string;
  text: string;
}

export interface FAQBlock {
  __component: 'blocks.faqs';
  id: number;
  Faq: FAQItem[];
}

// --- Master Union Type ---
export type PageBlock =
  | HeroBlock
  | SectionHeadingBlock
  | CardGridBlock
  | ContentWithImageBlock
  | MarkdownBlock
  | PersonCardBlock
  | FAQBlock;

export interface LandingPageData {
  data: {
    id: number;
    documentId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: PageBlock[];
  };
}

// type that maps the __component string to the correct component props
export type BlockComponentMap = {
  [K in PageBlock['__component']]: React.ComponentType<Extract<PageBlock, { __component: K }>>;
};

//Articles type

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
}

export interface Author {
  id: number;
  fullName: string;
  bio: string;
  image: StrapiImage;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  content: BlocksContent;
  createdAt: string;
  featuredImage: StrapiImage;
  author: Author;
}

interface pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
export interface ArticlesApiResponse {
  data: Article[];
  meta: {
    pagination: pagination;
  };
}

//single Article
export interface SingleArticleApiResponse {
  data: Article;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

//pricing section
export interface PricingButton {
  id: number;
  href: string | null;
  lable: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: 'PRIMARY' | 'SECONDARY';
}

export interface PriceCard {
  id: number;
  pricingHeader: string;
  pricingLable: string;
  PricingRate: string;
  pricingBenefits: string;
  pricingButton: PricingButton[];
}

export interface PricingData {
  id: number;
  documentId: string;
  mainHeader: string;
  subHeader: string;
  priceCard: PriceCard[];
}

// @/utils/types.ts

export interface PricingItem {
  id: number;
  documentId: string;
  mainHeader: string;
  subHeader: string;
  priceCard: PriceCard[];
}

export interface PricingResponse {
  data: PricingItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Define an interface for errors that have a 'message' property
export interface ErrorWithMessage {
  message: string;
}
