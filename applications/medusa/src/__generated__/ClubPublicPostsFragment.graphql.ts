/**
 * @generated SignedSource<<6ab05334b837a9d2b7c4e61879ca7180>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostsFragment$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClubEmptyPostsFragment" | "RootClubPostsPreviewFragment">;
  readonly " $fragmentType": "ClubPublicPostsFragment";
};
export type ClubPublicPostsFragment$key = {
  readonly " $data"?: ClubPublicPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "posts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "posts(first:1)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubEmptyPostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RootClubPostsPreviewFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "841198940b5bfb1fc604b1e2dab4adbd";

export default node;
