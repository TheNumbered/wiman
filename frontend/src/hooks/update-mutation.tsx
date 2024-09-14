import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobal } from './global-provider';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

interface UpdateMutationOptions {
  resource: string;
  baseUrl?: string;
  invalidateKeys?: string[];
  onSuccessMessage?: string;
  onSucessCallback?: () => void;
  method?: string;
  contentType?: string;
  bearerToken?: string;
}

export const useUpdateMutation = ({
  resource,
  invalidateKeys,
  onSuccessMessage,
  method,
  contentType,
  baseUrl,
  bearerToken,
  onSucessCallback,
}: UpdateMutationOptions) => {
  const { getToken } = useAuth();
  const { showToast } = useGlobal();
  const queryClient = useQueryClient();
  const baseUrlToUse = baseUrl || ourApiBaseUrl;

  contentType = contentType || 'application/json';
  const ContentType = contentType === 'empty' ? {} : { 'Content-Type': contentType };

  return useMutation({
    //@ts-ignore
    mutationFn: async (variables: { id: string | number; data: Record<string, any> }) => {
      const { id, data } = variables;
      // @ts-ignore
      return fetch(`${baseUrlToUse}/${resource}/${id}`, {
        method: method || 'PUT',
        headers: {
          Authorization: `Bearer ${bearerToken || (await getToken())}`,
          ...ContentType,
        },
        body: contentType === 'application/json' ? JSON.stringify(data) : data,
      }).then((response) => {
        if (!response.ok) {
          showToast('Failed to update resource', 'error');
          throw new Error('Failed to update resource');
        }
        return response.json();
      });
    },
    onSuccess: () => {
      if (onSuccessMessage) {
        showToast(onSuccessMessage, 'success');
      }
      if (onSucessCallback) {
        onSucessCallback();
      }
      queryClient.invalidateQueries({ queryKey: [resource] });
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
    onError: () => {
      showToast('Failed to update resource', 'error');
    },
  });
};
