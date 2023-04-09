export const dateTransformer = {
  from: (value: Date): string => {
    return value.toUTCString();
  },
  to: <T>(value: T): T => value,
};
