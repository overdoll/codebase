/**
 * @generated SignedSource<<5634c1429eb3ed04c52b120a6b35116f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewCharacterTileHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CharacterLinkTileFragment" | "PreviewCharacterFragment">;
  readonly " $fragmentType": "PreviewCharacterTileHomeFragment";
};
export type PreviewCharacterTileHomeFragment$key = {
  readonly " $data"?: PreviewCharacterTileHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewCharacterTileHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewCharacterTileHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewCharacterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterLinkTileFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "305bafb71c286870a792c0ecb6664006";

export default node;
