/**
 * @generated SignedSource<<67ac8516e45bb0025ee2da4ac8f563f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicContainedFragment">;
  readonly " $fragmentType": "RouletteScreenPostFragment";
};
export type RouletteScreenPostFragment$key = {
  readonly " $data"?: RouletteScreenPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicContainedFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "2ac20b0a490d2cabbd23c9f6e2f43f44";

export default node;
