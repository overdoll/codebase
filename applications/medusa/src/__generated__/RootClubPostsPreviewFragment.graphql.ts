/**
 * @generated SignedSource<<bb76ffe1736640403921a028d31a8da6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RootClubPostsPreviewFragment$data = {
  readonly slug: string;
  readonly supporterPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
  };
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsPreviewFragment">;
  readonly " $fragmentType": "RootClubPostsPreviewFragment";
};
export type RootClubPostsPreviewFragment$key = {
  readonly " $data"?: RootClubPostsPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RootClubPostsPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RootClubPostsPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporter",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "alias": "supporterPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "supporterOnlyStatus",
          "value": [
            "FULL",
            "PARTIAL"
          ]
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
      "storageKey": "posts(first:1,supporterOnlyStatus:[\"FULL\",\"PARTIAL\"])"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPostsPreviewFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "e1e5295203ada2b74ce48312ae382ed0";

export default node;
