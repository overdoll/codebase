// eslint-disable-next-line node/handle-callback-err
export default function shouldCaptureError (err: Error): boolean {
  return err.name !== 'RelayNetwork'
}
