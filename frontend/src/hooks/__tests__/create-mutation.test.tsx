import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCreateMutation } from '../create-mutation';

// Mocking useAuth
vi.mock('@clerk/clerk-react', () => ({
  useAuth: vi.fn(),
}));

// Mocking useMutation and useQueryClient
vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

describe('useCreateMutation Hook', () => {
  // it("should create a resource and invalidate queries", async () => {
  //   const mockGetToken = vi.fn().mockResolvedValue("mocked-token");
  //   const mockFetch = vi.fn().mockResolvedValue({
  //     ok: true,
  //     json: () => Promise.resolve({ data: "mocked data" })
  //   });

  //   //@ts-ignore
  //   global.fetch = mockFetch;

  //   // Mocking useAuth to return a mocked token
  //   //@ts-ignore
  //   (useAuth as vi.Mock).mockReturnValue({
  //     getToken: mockGetToken
  //   });

  //   // Mocking useQueryClient to return a dummy object
  //   const invalidateQueries = vi.fn();
  //   //@ts-ignore
  //   (useQueryClient as vi.Mock).mockReturnValue({
  //     invalidateQueries
  //   });

  //   const mockUseMutation = vi.fn().mockImplementation(({ mutationFn }) => {
  //     return {
  //       mutateAsync: () => mutationFn({ foo: "bar" }),
  //     };
  //   });
  //   //@ts-ignore
  //   (useMutation as vi.Mock).mockImplementation(mockUseMutation);

  //   const { result } = renderHook(() =>
  //     useCreateMutation({
  //       resource: "test-resource",
  //       invalidateKeys: ["key1", "key2"]
  //     })
  //   );

  //   // Trigger the mutation
  //   await act(async () => {
  //     await result.current.mutateAsync();
  //   });

  //   // Wait for the fetch to resolve
  //   expect(mockFetch).toHaveBeenCalledTimes(1);

  //   // Check if fetch was called with the correct arguments
  //   expect(mockFetch).toHaveBeenCalledWith(
  //     `${import.meta.env.VITE_API_URL}/test-resource`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: "Bearer mocked-token",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ foo: "bar" })
  //     }
  //   );

  //   // Ensure the queries were invalidated
  //   expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["test-resource"] });
  //   expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["key1"] });
  //   expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["key2"] });
  // });

  it('should throw an error when fetch fails', async () => {
    const mockGetToken = vi.fn().mockResolvedValue('mocked-token');
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to create resource' }),
    });
    //@ts-ignore
    global.fetch = mockFetch;

    // Mocking useAuth to return a mocked token
    //@ts-ignore
    (useAuth as vi.Mock).mockReturnValue({
      getToken: mockGetToken,
    });

    // Mocking useQueryClient to return a dummy object
    const invalidateQueries = vi.fn();
    //@ts-ignore
    (useQueryClient as vi.Mock).mockReturnValue({
      invalidateQueries,
    });

    const mockUseMutation = vi.fn().mockImplementation(({ mutationFn }) => {
      return {
        mutateAsync: () => mutationFn({ foo: 'bar' }),
      };
    });
    //@ts-ignore
    (useMutation as vi.Mock).mockImplementation(mockUseMutation);

    const { result } = renderHook(() =>
      useCreateMutation({
        resource: 'test-resource',
      }),
    );

    // Trigger the mutation and catch the error
    await expect(
      act(async () => {
        await result.current.mutateAsync();
      }),
    ).rejects.toThrow('Failed to create resource');

    // Ensure the queries were not invalidated
    expect(invalidateQueries).not.toHaveBeenCalled();
  });
});
