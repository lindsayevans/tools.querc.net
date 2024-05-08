export const classList = (classes: Array<string | undefined>) => {
  return classes.filter((x) => Boolean(x)).join(' ');
};
