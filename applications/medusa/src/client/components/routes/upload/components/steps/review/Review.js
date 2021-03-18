/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  state: any,
  disabled: boolean,
};

export default function Review({ state, disabled }: Props): Node {
  return (
    <>
      {state.files.map(file => {
        const image = state.urls[file.id];

        return (
          <div key={file.id}>
            {image ? <img alt="url" src={image} /> : 'no image available yet'}
          </div>
        );
      })}
      <div>artist: {state.artist.username}</div>
      <div>
        characters
        {Object.keys(state.characters).map(character => (
          <div key={state.characters[character].id}>
            {state.characters[character].name}-
            {state.characters[character].media.title}
          </div>
        ))}
      </div>
      <div>
        categories
        {Object.keys(state.categories).map(category => (
          <div key={state.categories[category].id}>
            {state.categories[category].title}
          </div>
        ))}
      </div>
      {disabled && <div>all images must upload first before submitting</div>}
    </>
  );
}
