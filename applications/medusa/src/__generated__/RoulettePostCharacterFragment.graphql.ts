/**
 * @generated SignedSource<<583379f72d02907984a0aa21ed94881f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RoulettePostCharacterFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterIconFragment">;
  readonly " $fragmentType": "RoulettePostCharacterFragment";
};
export type RoulettePostCharacterFragment$key = {
  readonly " $data"?: RoulettePostCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RoulettePostCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RoulettePostCharacterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterIconFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "f4c4e0cc668ddd33426a36bee5730841";

export default node;
