import { GlobalData } from './types';

export const FALLBACK_DATA: GlobalData = {
  id: 0,
  documentId: 'default-id',
  Title: 'Default Title',
  Description: 'Default Description',
  header: {
    id: 0,
    text: null,
    navItems: [],
    logo: {
      id: 0,
      lable: '',
      href: '/',
      isExternal: false,
      image: { id: 0, documentId: '', url: '' },
    },
  },
  footer: {
    id: 0,
    text: '',
    logo: {
      id: 0,
      lable: '',
      href: '/',
      isExternal: false,
      image: { id: 0, documentId: '', url: '' },
    },
    socialLinks: [],
  },
  login: {
    id: 0,
    mainText: 'Welcome',
    namelabel: 'Name',
    secondaryText: '',
    EmailLabel: 'Email',
    passwordlabel: 'Password',
    logoImage: { id: 0, documentId: '', url: '' },
  },
};
