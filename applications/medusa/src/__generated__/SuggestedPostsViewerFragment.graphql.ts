/**
 * @generated SignedSource<<a82a16a13f921fec1be7d3110f813578>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "SuggestedPostsViewerFragment";
};
export type SuggestedPostsViewerFragment$key = {
  readonly " $data"?: SuggestedPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuggestedPostsViewerFragment",
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

(node as any).hash = "e9e0582daff21c4f42ccb910582db787";

export default node;
