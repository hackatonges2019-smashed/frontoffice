import { Category } from './category.model';

export const CATEGORIES: Category[] = [
  { id: 1, nom: 'Crimes', idParent: null },
  { id: 2, nom: 'Accidents', idParent: null },
  { id: 3, nom: 'Incendie', idParent: null },
  { id: 4, nom: 'Drogues', idParent: null },
  { id: 5, nom: 'Insolite', idParent: null }
];

export const SUBCATEGORIES: Category[] = [
  { id: 6, nom: 'Homicides', idParent: 1 },
  { id: 7, nom: 'Enquêtes', idParent: 1 },
  { id: 8, nom: 'Fusillade', idParent: 1 },
  { id: 9, nom: 'Meutre', idParent: 1 },
  { id: 10, nom: 'Morte', idParent: 1 },
  { id: 11, nom: 'Cadavre', idParent: 1 }
];