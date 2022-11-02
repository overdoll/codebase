/**
 * @generated SignedSource<<4dc2362e27e53437087dd3071b81bdb6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscoverClubsTilesFragment$data = {
  readonly discoverClubs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubPreviewFragment">;
      };
    }>;
  };
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubPreviewViewerFragment">;
  } | null;
  readonly " $fragmentType": "DiscoverClubsTilesFragment";
};
export type DiscoverClubsTilesFragment$key = {
  readonly " $data"?: DiscoverClubsTilesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubsTilesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscoverClubsTilesFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 12
        }
      ],
      "concreteType": "ClubConnection",
      "kind": "LinkedField",
      "name": "discoverClubs",
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
                  "name": "DiscoverClubPreviewFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "discoverClubs(first:12)"
    },
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
          "name": "DiscoverClubPreviewViewerFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a404e7c0c5906d0b9269b9a15ced1bc5";

export default node;
