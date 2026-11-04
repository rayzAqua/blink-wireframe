import { useContext } from 'react';
import { SelectionContext } from './selection-context';
import type { SelectionValue } from './selection-context';

export function useSelection(): SelectionValue {
  const value = useContext(SelectionContext);
  if (!value) throw new Error('useSelection must be used within a SelectionProvider');
  return value;
}
