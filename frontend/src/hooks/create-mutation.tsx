import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobal } from './global-provider';
const ourApiBaseUrl = import.meta.env.VITE_API_URL;

interface CreateMutationOptions {
  resource: string;
  baseUrl?: string;
  invalidateKeys?: string[];
  onSuccessMessage?: string;
  onSucessCallback?: () => void;
  contentType?: string;
  bearerToken?: string;
}

export const useCreateMutation = ({
  resource,
  invalidateKeys,
  contentType,
  baseUrl,
  bearerToken,
  onSuccessMessage,
  onSucessCallback,
}: CreateMutationOptions) => {
  const { getToken } = useAuth();
  const { showToast } = useGlobal();
  const queryClient = useQueryClient();
  const baseUrlToUse = baseUrl || ourApiBaseUrl;

  contentType = contentType || 'application/json';
  const ContentType = contentType === 'empty' ? {} : { 'Content-Type': contentType };

  return useMutation({
    mutationFn: async (variables: Record<string, any>) =>
      //@ts-ignore
      fetch(`${baseUrlToUse}/${resource}`, {
        method: 'POST',
        //@ts-ignore
        headers: {
          Authorization: `Bearer ${bearerToken || (await getToken())}`,
          ...ContentType,
        },
        //@ts-ignore
        body: contentType === 'application/json' ? JSON.stringify(variables) : variables,
      }).then((response) => {
        if (!response.ok) {
          showToast('Failed to create resource', 'error');
          throw new Error('Failed to create resource');
        }
        return response.json();
      }),
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
      showToast('Failed to create resource', 'error');
    },
  });
};
