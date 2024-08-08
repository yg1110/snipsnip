import create from 'zustand';

interface ExpandedState {
  isAllExpanded: boolean;
  expanded: () => void;
  collapsed: () => void;
}

export const useStore = create<ExpandedState>(set => ({
  isAllExpanded: false,
  expanded: () => set(state => ({ isAllExpanded: true })),
  collapsed: () => set(state => ({ isAllExpanded: false })),
}));
