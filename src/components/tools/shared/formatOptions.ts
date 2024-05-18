export const formatOptions = (options: any) => {
  return JSON.stringify(options, null, 2).replace(/\"([a-z]*)\"\:/gi, '$1:');
};
