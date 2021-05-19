import theme from '../theme';

export default {
  title: 'Theme/Color Palette',
};

const RenderPalette = (obj) =>
  Object.keys(obj).map((key) => (
    <div key={key} sx={{ display: 'flex' }}>
      <div sx={{ width: '50px', fontWeight: 'bold' }}>{key}</div>
      <div
        key={key}
        sx={{
          backgroundColor: obj[key],
          width: '500px',
          height: '20px',
        }}
      />
    </div>
  ));

export const Primary = (args) => {
  return RenderPalette(theme.colors.primary);
};

export const Neutral = (args) => {
  return RenderPalette(theme.colors.neutral);
};

export const Orange = (args) => {
  return RenderPalette(theme.colors.orange);
};

export const Teal = (args) => {
  return RenderPalette(theme.colors.teal);
};

export const Green = (args) => {
  return RenderPalette(theme.colors.green);
};

export const Purple = (args) => {
  return RenderPalette(theme.colors.purple);
};
