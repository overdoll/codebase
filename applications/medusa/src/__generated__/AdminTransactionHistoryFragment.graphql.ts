/**
 * @generated SignedSource<<cc0d9dbc10fea55b060bade595c08ad5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminTransactionHistoryFragment$data = {
  readonly transactionHistory: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "AdminTransactionHistoryFragment";
};
export type AdminTransactionHistoryFragment = AdminTransactionHistoryFragment$data;
export type AdminTransactionHistoryFragment$key = {
  readonly " $data"?: AdminTransactionHistoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminTransactionHistoryFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "transactionHistory"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "endDate"
    },
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "startDate"
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
      "operation": require('./AdminTransactionHistoryPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "AdminTransactionHistoryFragment",
  "selections": [
    {
      "alias": "transactionHistory",
      "args": [
        {
          "kind": "Variable",
          "name": "endDate",
          "variableName": "endDate"
        },
        {
          "kind": "Variable",
          "name": "startDate",
          "variableName": "startDate"
        }
      ],
      "concreteType": "AccountTransactionHistoryConnection",
      "kind": "LinkedField",
      "name": "__AdminTransactionHistory_transactionHistory_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountTransactionHistoryEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "843d75ae10985c761157cd6e6e39bee9";

export default node;
