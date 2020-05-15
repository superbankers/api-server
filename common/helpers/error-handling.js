export const ErrorHandler = (err, res) => {
  res.status(404).end(JSON.stringify(err))
}