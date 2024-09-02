import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useGetQuery } from '../get-query';

// Mocking useAuth
vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(),
}));

// Mocking useQuery
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

describe('getQuery Hook', () => {
  it('should fetch data with the correct headers', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mocked-token');
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'mocked data' }),
    });
    //@ts-ignore
    global.fetch = mockFetch;

    // Mocking useAuth to return a mocked token
    //@ts-ignore
    useAuth.mockReturnValue({
      getToken: mockGetToken,
    });

    // Mocking useQuery to call the actual fetch
    //@ts-ignore
    useQuery.mockImplementation(({ queryFn }) => {
      return {
        data: queryFn(),
        isLoading: false,
        isError: false,
      };
    });

    const { result } = renderHook(() =>
      useGetQuery({
        resource: 'test-resource',
      }),
    );

    // Wait for the fetch to resolve
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    // Check if fetch was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/test-resource`, {
      headers: {
        Authorization: 'Bearer mocked-token',
      },
    });

    // Ensure the data returned is correct
    expect(result.current.data).resolves.toEqual({ data: 'mocked data' });
  });

  // it("should throw an error when fetch fails", async () => {
  //   const mockGetToken = vi.fn().mockResolvedValue("mocked-token");
  //   const mockFetch = vi.fn().mockResolvedValue({
  //     ok: false,
  //     json: () => Promise.resolve({ message: "Failed to fetch data" })
  //   });

  //   //@ts-ignore
  //   global.fetch = mockFetch;

  //   // Mocking useAuth to return a mocked token
  //   //@ts-ignore
  //   (useAuth).mockReturnValue({
  //     getToken: mockGetToken
  //   });

  //   // Mocking useQuery to call the actual fetch
  //   //@ts-ignore
  //   (useQuery).mockImplementation(({ queryFn }) => {
  //     return {
  //       data: queryFn(),
  //       isLoading: false,
  //       isError: true
  //     };
  //   });

  //   const { result } = renderHook(() =>
  //     useGetQuery({
  //       resource: "test-resource",
  //     })
  //   );

  //   // Wait for the fetch to resolve
  //   await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

  //   // Ensure the hook throws an error
  //   expect(result.current.data).rejects.toThrow("Failed to fetch data");
  // });
});
