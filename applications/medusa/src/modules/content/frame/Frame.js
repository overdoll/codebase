const Frame = ({ children, sx }) => (
  <div sx={{ display: 'flex', width: '100%', mt: 5 }}>
    <div sx={{ margin: 'auto', width: ['small', 'regular'] }}>{children}</div>
  </div>
);

export default Frame;
