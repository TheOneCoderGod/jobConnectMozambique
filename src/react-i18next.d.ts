// src/react-i18next.d.ts

import 'react-i18next';
import { resources } from './i18n';

// Re-declare the react-i18next module to leverage your own resources
declare module 'react-i18next' {
  interface CustomTypeOptions {
    // The default namespace of your i18next configuration
    defaultNS: 'translation';
    // Our resources, using the fallback language keys or a superset
    resources: typeof resources['pt'];
  }
}
