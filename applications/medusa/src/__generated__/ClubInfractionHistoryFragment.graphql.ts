/**
 * @generated SignedSource<<f1d711f58b4390b4ae6e3cd7bbf06bce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubInfractionHistoryFragment$data = {
  readonly infractionHistory: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly issuedAt: any;
        readonly expiresAt: any;
        readonly rule: {
          readonly title: string;
        };
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubInfractionHistoryFragment";
};
export type ClubInfractionHistoryFragment = ClubInfractionHistoryFragment$data;
export type ClubInfractionHistoryFragment$key = {
  readonly " $data"?: ClubInfractionHistoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubInfractionHistoryFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "infractionHistory"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 3,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./ClubInfractionHistoryPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubInfractionHistoryFragment",
  "selections": [
    {
      "alias": "infractionHistory",
      "args": null,
      "concreteType": "ClubInfractionHistoryConnection",
      "kind": "LinkedField",
      "name": "__ClubInfractionHistory_infractionHistory_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubInfractionHistoryEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ClubInfractionHistory",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "issuedAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "expiresAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Rule",
                  "kind": "LinkedField",
                  "name": "rule",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "title",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "0d8e282d08e3140ddfb6847af8c41374";

export default node;
