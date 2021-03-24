import { useHistory } from '@//:modules/routing/useHistory';

export const useLocation = () => {
  return useHistory().location;
};
