export default function handler (req, res): void {
  res.status(200).send(process.env.APP_VERSION)
}
