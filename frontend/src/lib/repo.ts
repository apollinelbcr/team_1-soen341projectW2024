import type {Vehicle} from "$lib/model/Vehicle";

const prefix = '/api/v1';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const client = {
  async get(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, init);
  },

  async post(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, {
      method: 'POST',
      ...init,
    });
  },

  async put(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, {
      method: 'PUT',
      ...init,
    });
  },

  async delete(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(prefix + endpoint, {
      method: 'DELETE',
      ...init,
    });
  },

  async deserialize<T>(
    method: Method,
    endpoint: string,
    init?: RequestInit
  ): Promise<T> {
    const run = async (
      fn: (endpoint: string, init?: RequestInit) => Promise<Response>
    ): Promise<T> => (await (await fn(endpoint, init)).json()) as T;

    switch (method) {
      case 'GET':
        return run(this.get);
      case 'POST':
        return run(this.post);
      case 'PUT':
        return run(this.put);
      case 'DELETE':
        return run(this.delete);
    }
  },
};

export const repo = {

  async getVehicles(): Promise<Vehicle[]> {
    return client.deserialize<Vehicle[]>(
      'GET',
      `/vehicles`
    );
  },

  async getVehicle(id: string): Promise<Vehicle> {
    return client.deserialize<Vehicle>(
        'GET',
        `/vehicles/${id}`
    );
  },

  async getUser(fetch: { (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>; (arg0: string): any; }): Promise<any> {
    const backendURL = 'http://localhost:3002/auth/profile';
    let payload = null;
    const response = await fetch(backendURL);
    if (response.ok) {
      payload = await response.json();
    }
    return payload;
  },

};
