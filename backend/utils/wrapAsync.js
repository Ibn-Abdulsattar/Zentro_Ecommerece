const wrapAsync = (fnx) => {
  return (req, res, next) => {
    Promise.resolve(fnx(req, res, next)).catch(next);
  };
};

export default wrapAsync;
