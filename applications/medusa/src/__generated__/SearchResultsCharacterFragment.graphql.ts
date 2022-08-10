/**
 * @generated SignedSource<<b8f2d298c46fbfdccca3ea4b555aebb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchResultsCharacterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CharacterLinkTileFragment" | "CharacterTileOverlayFragment">;
  readonly " $fragmentType": "SearchResultsCharacterFragment";
};
export type SearchResultsCharacterFragment$key = {
  readonly " $data"?: SearchResultsCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchResultsCharacterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterTileOverlayFragment"
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

(node as any).hash = "17cbe893b835626a65adaf53fdf83ca3";

export default node;
