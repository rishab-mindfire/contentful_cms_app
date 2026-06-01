export const mockArticle = {
  id: 123,
  documentId: 'doc-abc-456',
  title: 'Mastering JavaScript Components',
  description: 'A deep dive into writing clean components.',
  slug: 'mastering-javascript-components',
  createdAt: '2026-06-01',

  //  static literal evaluation
  content: JSON.parse(
    JSON.stringify([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'This is the main rich-text body content.' }],
      },
    ]),
  ),

  featuredImage: {
    id: 1,
    url: '/uploads/featured-banner.jpg',
    alternativeText: 'Banner',
  },
  author: {
    id: 9,
    fullName: 'Jane Doe',
    bio: 'Writer.',
    image: {
      id: 2,
      url: '/uploads/jane-avatar.jpg',
      alternativeText: 'Avatar',
    },
  },
};

export const mockGlobalContextValues = {
  isDbDown: false,
  session: null,
  globalData: {
    id: 1,
    documentId: 'global-config-doc-id',
    Title: 'Core CMS Application',
    Description: 'Global Application Configuration Settings',

    // 1. Matches your HeaderType interface
    header: {
      id: 1,
      text: 'Welcome Header Text',
      navItems: [
        {
          id: 10,
          href: '/dashboard',
          lable: 'Dashboard',
          isExternal: false,
          isButtonLink: false,
          type: 'primary',
        },
      ],
      logo: {
        id: 2,
        lable: 'Header Brand Icon',
        href: '/',
        isExternal: false,
        image: {
          id: 200,
          documentId: 'doc-header-logo-11',
          url: '/header-logo.png',
        },
      },
    },

    // 2. Matches your LoginType interface with 'id' explicitly at the root level
    login: {
      id: 1,
      mainText: 'My CMS Platform',
      secondaryText: 'Sign in to access your platform config',
      namelabel: 'Full Name',
      EmailLabel: 'Email Address',
      passwordlabel: 'Password Secure',
      logoImage: {
        id: 42,
        documentId: 'doc-logo-123',
        url: '/cms-logo.png',
        alternativeText: 'Brand Logo Icon',
      },
      link: {
        id: 1,
        href: '/help',
        lable: 'Help Page',
        isExternal: false,
        isButtonLink: false,
        type: 'anchor',
      },
    },

    // 3. Matches your FooterType interface
    footer: {
      id: 1,
      text: 'Platform footer description copy.',
      logo: {
        id: 3,
        lable: 'Footer Brand Icon',
        href: '/',
        isExternal: false,
        image: {
          id: 300,
          documentId: 'doc-footer-logo-22',
          url: '/footer-logo.png',
        },
      },
      socialLinks: [],
    },
  },
};
