export const validateUrl = (url: string) => {
  return /^(http|https):\/\/[^ "]+$/.test(url);
};
