export const required = (value: string, message: string) =>
  value.trim() ? null : message;
