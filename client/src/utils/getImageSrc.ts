export const getImageSrc = (src: string) => {
  return `${process.env.REACT_APP_HOST}${src}`;
};
