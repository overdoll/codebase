export default (req, res) => {
  res.json({
    coverage: global.__coverage__ || null
  })
}
