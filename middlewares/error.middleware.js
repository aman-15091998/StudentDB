export const handleError = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  let message = err.message;
  // if (err instanceof Error) message = "Something went wrong";
  console.log(err);
  res.render("error", {
    error: message,
  });
};
