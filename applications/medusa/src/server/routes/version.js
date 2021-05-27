export default function (req, res, next) {
  return res.send(process.env.APP_VERSION)
}
