/**
 * @generated SignedSource<<6cbb7c942ecebe9edbf6ef38d76b6057>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubDraftPostsAlertFragment$data = {
  readonly draftPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
  };
  readonly slug: string;
  readonly " $fragmentType": "ClubDraftPostsAlertFragment";
};
export type ClubDraftPostsAlertFragment$key = {
  readonly " $data"?: ClubDraftPostsAlertFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubDraftPostsAlertFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubDraftPostsAlertFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "draftPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "state",
          "value": "DRAFT"
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
      "storageKey": "posts(first:1,state:\"DRAFT\")"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1ef9d5517fce8feb55e82a63e99690b3";

export default node;
