export type SetEvents<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

export type Resettable = {
  reset: () => void;
};
