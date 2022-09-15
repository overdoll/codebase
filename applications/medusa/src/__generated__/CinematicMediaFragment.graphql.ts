/**
 * @generated SignedSource<<9066caaef55faa87e16394f940061b0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"CinematicImageMediaFragment">;
  readonly " $fragmentType": "CinematicMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly " $fragmentSpreads": FragmentRefs<"CinematicVideoMediaFragment">;
  readonly " $fragmentType": "CinematicMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "CinematicMediaFragment";
};
export type CinematicMediaFragment$key = {
  readonly " $data"?: CinematicMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CinematicMediaFragment",
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
          "name": "CinematicVideoMediaFragment"
        }
      ],
      "type": "VideoMedia",
      "abstractKey": null
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "531179383e0e747250be4ceba3135014";

export default node;
