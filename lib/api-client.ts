import axios from "axios";

let tokenGetter: (() => Promise<string | null>) | null = null;

export function setTokenGetter(getter: () => Promise<string | null>) {
  tokenGetter = getter;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  if (tokenGetter) {
    const token = await tokenGetter();
    if (token) {
      config.headers["x-auth-token"] = token;
    }
  }

  if (
    config.method &&
    ["post", "put", "delete", "patch"].includes(config.method.toLowerCase())
  ) {
    config.headers["idempotency-key"] = crypto.randomUUID();
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === "object" && "data" in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.data) {
      const msg =
        error.response.data.message ||
        error.response.data.error ||
        "Request failed";
      return Promise.reject(new Error(msg));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
