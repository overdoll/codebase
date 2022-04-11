/**
 * @generated SignedSource<<0a7e2b36d12ab0e3788125f333bceecb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicPostPageViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostViewerFragment">;
  readonly " $fragmentType": "PublicPostPageViewerFragment";
};
export type PublicPostPageViewerFragment = PublicPostPageViewerFragment$data;
export type PublicPostPageViewerFragment$key = {
  readonly " $data"?: PublicPostPageViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicPostPageViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicPostPageViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullDetailedPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "33282f0d38b5829a9710e3a29ec621ec";

export default node;
