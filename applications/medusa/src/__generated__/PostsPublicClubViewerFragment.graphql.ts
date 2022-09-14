/**
 * @generated SignedSource<<d3fd1e4fc4b12cd16d60d3544a14e5de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostsViewerFragment">;
  readonly " $fragmentType": "PostsPublicClubViewerFragment";
};
export type PostsPublicClubViewerFragment$key = {
  readonly " $data"?: PostsPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPublicPostsViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "8cf9c1c1ba950a10006fa85aca696db5";

export default node;
