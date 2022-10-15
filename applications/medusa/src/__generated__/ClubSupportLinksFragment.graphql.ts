/**
 * @generated SignedSource<<05c2eaa2769d1c332c9d687774aa46ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportLinksFragment$data = {
  readonly clubs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ClubSupportTileClubFragment">;
      };
    }>;
  };
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubSupportTileAccountFragment">;
  } | null;
  readonly " $fragmentType": "ClubSupportLinksFragment";
};
export type ClubSupportLinksFragment$key = {
  readonly " $data"?: ClubSupportLinksFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportLinksFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportLinksFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubSupportTileAccountFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "canSupport",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "ClubConnection",
      "kind": "LinkedField",
      "name": "clubs",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Club",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubSupportTileClubFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "clubs(canSupport:true,first:20)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "60c0be3485e9cffe401a921eee73f748";

export default node;
