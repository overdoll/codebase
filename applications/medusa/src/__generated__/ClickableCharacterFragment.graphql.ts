/**
 * @generated SignedSource<<34ecb004d5969bf0ccb1e9ac1066a544>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClickableCharacterFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterLinkTileFragment">;
  readonly " $fragmentType": "ClickableCharacterFragment";
};
export type ClickableCharacterFragment$key = {
  readonly " $data"?: ClickableCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClickableCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClickableCharacterFragment",
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
      "name": "CharacterLinkTileFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "86448c9edab54fbb7c1ec211272d1669";

export default node;
