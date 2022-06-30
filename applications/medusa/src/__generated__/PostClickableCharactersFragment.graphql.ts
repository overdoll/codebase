/**
 * @generated SignedSource<<bca4cdd91c6b39de24de3f5ec74e8608>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostClickableCharactersFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ClickableCharacterFragment">;
  }>;
  readonly " $fragmentType": "PostClickableCharactersFragment";
};
export type PostClickableCharactersFragment$key = {
  readonly " $data"?: PostClickableCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostClickableCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClickableCharacterFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "abe977fe9ebb024ad62e215df04a0be2";

export default node;
