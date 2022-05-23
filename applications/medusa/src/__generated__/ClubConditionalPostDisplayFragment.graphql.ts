/**
 * @generated SignedSource<<46a24e3e20842a75029ea9cfc669544f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubConditionalPostDisplayFragment$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonClubFragment" | "ClubExclusivePostsFragment" | "ClubTopPostsFragment">;
  readonly " $fragmentType": "ClubConditionalPostDisplayFragment";
};
export type ClubConditionalPostDisplayFragment = ClubConditionalPostDisplayFragment$data;
export type ClubConditionalPostDisplayFragment$key = {
  readonly " $data"?: ClubConditionalPostDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubConditionalPostDisplayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubConditionalPostDisplayFragment",
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
      "name": "SupportClubButtonClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExclusivePostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTopPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b1fb63e6c9b2ad5dea9b823e54ba588d";

export default node;
