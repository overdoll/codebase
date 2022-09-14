/**
 * @generated SignedSource<<2707a16ae7151254b7438a86c4d729ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostsFragment">;
  readonly " $fragmentType": "PostsPublicClubFragment";
};
export type PostsPublicClubFragment$key = {
  readonly " $data"?: PostsPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsPublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPublicPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "5d79e1adc8b2f7e9ee025e7511e12563";

export default node;
