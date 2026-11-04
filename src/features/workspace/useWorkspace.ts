import { useContext } from 'react';
import { WorkspaceContext } from './workspace-context';
import type { WorkspaceValue } from './workspace-context';

export function useWorkspace(): WorkspaceValue {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error('useWorkspace must be used within a WorkspaceProvider');
  return value;
}
