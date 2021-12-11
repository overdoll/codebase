export default function error (err, req, res, next): void {
  if (process.env.APP_DEBUG === 'true') {
    console.log(err)
  }

  next(err)
}
