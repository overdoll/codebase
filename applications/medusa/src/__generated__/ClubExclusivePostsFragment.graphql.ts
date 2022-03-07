/**
 * @generated SignedSource<<c86ce03788f83ea5455332b104b75d00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubExclusivePostsFragment$data = {
  readonly slug: string;
  readonly exclusivePosts: {
    readonly " $fragmentSpreads": FragmentRefs<"PostsHorizontalPreviewFragment">;
  };
  readonly " $fragmentType": "ClubExclusivePostsFragment";
};
export type ClubExclusivePostsFragment = ClubExclusivePostsFragment$data;
export type ClubExclusivePostsFragment$key = {
  readonly " $data"?: ClubExclusivePostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubExclusivePostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubExclusivePostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "exclusivePosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "NEW"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "posts",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostsHorizontalPreviewFragment"
        }
      ],
      "storageKey": "posts(first:10,sortBy:\"NEW\")"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "ef8eeef048a46db8cee979cdc5bb6415";

export default node;
