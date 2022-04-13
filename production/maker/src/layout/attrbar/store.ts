import { createMutable } from 'solid-js/store';

export interface StoreModel {
  name: string;
}

const createDefaultValue = (): StoreModel => ({ name: 'template' });

export const store = createMutable<StoreModel>(createDefaultValue());
