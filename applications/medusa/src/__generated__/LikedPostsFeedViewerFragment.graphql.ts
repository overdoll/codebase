/**
 * @generated SignedSource<<308b589e8671db5b5b72f624272162e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LikedPostsFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "LikedPostsFeedViewerFragment";
};
export type LikedPostsFeedViewerFragment$key = {
  readonly " $data"?: LikedPostsFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LikedPostsFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LikedPostsFeedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b6b8de1726ef1ee9f33b9f7059ff487d";

export default node;
