/**
 * @generated SignedSource<<5203da6e29047222372b1ebbd32069e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"CinematicImageMediaFragment">;
  readonly " $fragmentType": "RouletteMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly " $fragmentSpreads": FragmentRefs<"RouletteVideoMediaFragment">;
  readonly " $fragmentType": "RouletteMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "RouletteMediaFragment";
};
export type RouletteMediaFragment$key = {
  readonly " $data"?: RouletteMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CinematicImageMediaFragment"
        }
      ],
      "type": "ImageMedia",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "RouletteVideoMediaFragment"
        }
      ],
      "type": "VideoMedia",
      "abstractKey": null
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "bac0497f9b7b3a17b9648cfef6ead906";

export default node;
