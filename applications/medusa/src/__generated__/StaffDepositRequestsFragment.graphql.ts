/**
 * @generated SignedSource<<df28fa4a3f5e71feeb61c7c4c42e8592>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffDepositRequestsFragment$data = {
  readonly depositRequests: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffDepositRequestCardFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "StaffDepositRequestsFragment";
};
export type StaffDepositRequestsFragment$key = {
  readonly " $data"?: StaffDepositRequestsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffDepositRequestsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "depositRequests"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 5,
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
      "fragmentPathInResult": [],
      "operation": require('./DepositRequestsPaginationQuery.graphql')
    }
  },
  "name": "StaffDepositRequestsFragment",
  "selections": [
    {
      "alias": "depositRequests",
      "args": null,
      "concreteType": "DepositRequestConnection",
      "kind": "LinkedField",
      "name": "__DepositRequestsFragment_depositRequests_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "DepositRequestEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "DepositRequest",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reference",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "StaffDepositRequestCardFragment"
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "122b0a6e19b17a04fb7aaecb5c8f26c1";

export default node;
