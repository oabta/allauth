import {beforeEach, describe, expect, it, vi} from 'vitest';
import {AllauthClient} from "@browser/client";

describe('Client', () => {
  const baseUrl = "http://localhost:8080/_allauth/browser/v1"
  const client = new AllauthClient({
    baseUrl, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  beforeEach(() => {
    document.cookie = '';
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should include credentials in all requests', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({data: {}, meta: {}}),
    } as Response);

    await client.dispatch({
      method: "GET",
      path: "/config",
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(baseUrl + '/config'),
      expect.objectContaining({credentials: 'include'})
    );
  });

  it('should attach X-CSRFToken header', async () => {
    document.cookie = 'csrftoken=test-csrf-token';
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({data: {}, meta: {}}),
    } as Response);

    await client.dispatch({
      method: "POST",
      path: "/config",
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(baseUrl + '/config'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-CSRFToken': 'test-csrf-token',
        }),
      })
    );
  });
});
