/**
 * @generated SignedSource<<9087fb95351d591023d5bf7201dc35a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminTransactionsFragment$data = {
  readonly transactions: {
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"AdminTransactionsListFragment">;
  };
  readonly id: string;
  readonly " $fragmentType": "AdminTransactionsFragment";
};
export type AdminTransactionsFragment = AdminTransactionsFragment$data;
export type AdminTransactionsFragment$key = {
  readonly " $data"?: AdminTransactionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminTransactionsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "transactions"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./AdminTransactionsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "AdminTransactionsFragment",
  "selections": [
    {
      "alias": "transactions",
      "args": null,
      "concreteType": "AccountTransactionConnection",
      "kind": "LinkedField",
      "name": "__AdminTransactions_transactions_connection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AdminTransactionsListFragment"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountTransactionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountTransaction",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/)
              ],
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

(node as any).hash = "22a03e879a3cafc76179c3549274df00";

export default node;
