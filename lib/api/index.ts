import { API_ROUTES } from './endpoints';

export const getApiUrl = (
    route: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryParams: Record<string, any> = {},
) => {
    const url = new URL(`${API_ROUTES.BASE_URL}${route}`);

    Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            url.searchParams.append(key, queryParams[key]);
        }
    });

    return url.toString();
};
