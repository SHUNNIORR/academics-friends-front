export const environment = {
  production: true,
  url:
    window['env' as any]['ApiUrl' as any] || 'http://localhost:5010/api/hero',
};
