/**
 * @generated SignedSource<<03703b508faf62cbaf55c71976b0bfe5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubTopPostsFragment$data = {
  readonly slug: string;
  readonly topPosts: {
    readonly " $fragmentSpreads": FragmentRefs<"PostsHorizontalPreviewFragment">;
  };
  readonly " $fragmentType": "ClubTopPostsFragment";
};
export type ClubTopPostsFragment = ClubTopPostsFragment$data;
export type ClubTopPostsFragment$key = {
  readonly " $data"?: ClubTopPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubTopPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubTopPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "topPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "TOP"
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
      "storageKey": "posts(first:10,sortBy:\"TOP\")"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a6fef71cd9cc2ac2f27e7b5f3d14dbbf";

export default node;
