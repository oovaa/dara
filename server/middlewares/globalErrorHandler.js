const sendErrorForDev = (res, err) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err, // Full error object for debugging
    message: err.message,
    stack: err.stack, // Stack trace for debugging
  });

const sendErrorForProd = (res, err) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : "Something went wrong!",
    // If the error is operational, show the message, otherwise give a generic message
  });

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(res, err);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorForProd(res, err);
  }
  
};

export default globalErrorHandler;