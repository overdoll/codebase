/**
 * @generated SignedSource<<d5f4af8b0dff2f8cfa24c8f0bcc52195>>
 * @relayHash 7be2ac0b6e057a03d08f1e37f8528e4a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7be2ac0b6e057a03d08f1e37f8528e4a

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAccountTransactionQuery$variables = {
  reference: string;
};
export type AdminAccountTransactionQueryVariables = AdminAccountTransactionQuery$variables;
export type AdminAccountTransactionQuery$data = {
  readonly accountTransaction: {
    readonly " $fragmentSpreads": FragmentRefs<"AdminTransactionCardFragment" | "AdminAccountTransactionOptionsFragment" | "AdminAccountTransactionSubscriptionFragment" | "AdminAccountTransactionEventsFragment">;
  } | null;
};
export type AdminAccountTransactionQueryResponse = AdminAccountTransactionQuery$data;
export type AdminAccountTransactionQuery = {
  variables: AdminAccountTransactionQueryVariables;
  response: AdminAccountTransactionQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "supporterSince",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminAccountTransactionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AccountTransaction",
        "kind": "LinkedField",
        "name": "accountTransaction",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminTransactionCardFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminAccountTransactionOptionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminAccountTransactionSubscriptionFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminAccountTransactionEventsFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminAccountTransactionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AccountTransaction",
        "kind": "LinkedField",
        "name": "accountTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "clubSupporterSubscription",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reference",
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "type": "IAccountClubSupporterSubscription",
                "abstractKey": "__isIAccountClubSupporterSubscription"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isAccountClubSupporterSubscription"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "nextBillingDate",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "type": "AccountActiveClubSupporterSubscription",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endDate",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "type": "AccountCancelledClubSupporterSubscription",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "expiredAt",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "type": "AccountExpiredClubSupporterSubscription",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "billedAtDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountTransactionEvent",
            "kind": "LinkedField",
            "name": "events",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "reason",
                "storageKey": null
              },
              (v2/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "7be2ac0b6e057a03d08f1e37f8528e4a",
    "metadata": {},
    "name": "AdminAccountTransactionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "bf1e797c45ea9c4caefd6d60ce0cdd74";

export default node;
