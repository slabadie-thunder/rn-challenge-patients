export const isNil = (value: unknown) => {
  return value === null || value === undefined;
};

export const minutesToMilliseconds = (minutes: number) => {
  return minutes * 60 * 1000;
};
