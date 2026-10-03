import axios from "axios";

/**
 * Shared axios instance.
 * - withCredentials: the session lives in an HttpOnly cookie set by the API (never readable from JS)
 * - X-Requested-With: required by the API for state-changing requests (CSRF protection)
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_CRM_BACKEND_URL,
    withCredentials: true,
    headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default api;
