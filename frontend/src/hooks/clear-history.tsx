import { useAuth } from '@clerk/clerk-react';
import { useGlobal } from './global-provider';

export const useClearHistory = () => {
  const { showToast } = useGlobal();
  const { getToken } = useAuth();

  const clearHistory = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/history`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear history');
      }

      // Optionally reload the page
      window.location.reload();
    } catch {
      showToast('Failed to clear history', 'error');
    }
  };

  return {
    clearHistory,
  };
};
