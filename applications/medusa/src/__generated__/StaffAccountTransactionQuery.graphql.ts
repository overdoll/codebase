/**
 * @generated SignedSource<<5838e0f31d2fa321fa7a640d67866996>>
 * @relayHash 1ac9a621d02ac1c3709c1a08b3a2cb34
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1ac9a621d02ac1c3709c1a08b3a2cb34

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountTransactionQuery$variables = {
  reference: string;
};
export type StaffAccountTransactionQueryVariables = StaffAccountTransactionQuery$variables;
export type StaffAccountTransactionQuery$data = {
  readonly accountTransaction: {
    readonly " $fragmentSpreads": FragmentRefs<"StaffTransactionCardFragment" | "StaffAccountTransactionOptionsFragment" | "StaffAccountTransactionSubscriptionFragment" | "StaffAccountTransactionEventsFragment">;
  } | null;
};
export type StaffAccountTransactionQueryResponse = StaffAccountTransactionQuery$data;
export type StaffAccountTransactionQuery = {
  variables: StaffAccountTransactionQueryVariables;
  response: StaffAccountTransactionQuery$data;
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
  "name": "amount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
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
    "name": "StaffAccountTransactionQuery",
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
            "name": "StaffTransactionCardFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountTransactionOptionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountTransactionSubscriptionFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountTransactionEventsFragment"
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
    "name": "StaffAccountTransactionQuery",
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
            "concreteType": "CCBillTransaction",
            "kind": "LinkedField",
            "name": "ccbillTransaction",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ccbillTransactionId",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountTransactionEvent",
            "kind": "LinkedField",
            "name": "events",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "reason",
                "storageKey": null
              },
              (v4/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "1ac9a621d02ac1c3709c1a08b3a2cb34",
    "metadata": {},
    "name": "StaffAccountTransactionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fdb2230d1b2dd6bedca1489c5498c3b4";

export default node;
