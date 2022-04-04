/**
 * @generated SignedSource<<eec9863c14c2718941388144bc893389>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffCancelledSubscriptionTransactionsFragment$data = {
  readonly transactions: {
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"StaffTransactionsListFragment">;
  };
  readonly id: string;
  readonly " $fragmentType": "StaffCancelledSubscriptionTransactionsFragment";
};
export type StaffCancelledSubscriptionTransactionsFragment = StaffCancelledSubscriptionTransactionsFragment$data;
export type StaffCancelledSubscriptionTransactionsFragment$key = {
  readonly " $data"?: StaffCancelledSubscriptionTransactionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffCancelledSubscriptionTransactionsFragment">;
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
      "operation": require('./StaffCancelledSubscriptionTransactionsFragmentPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffCancelledSubscriptionTransactionsFragment",
  "selections": [
    {
      "alias": "transactions",
      "args": null,
      "concreteType": "AccountTransactionConnection",
      "kind": "LinkedField",
      "name": "__StaffCancelledSubscriptionTransactions_transactions_connection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StaffTransactionsListFragment"
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
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};
})();

(node as any).hash = "07f7311b483c93d04a071052cf1af513";

export default node;
