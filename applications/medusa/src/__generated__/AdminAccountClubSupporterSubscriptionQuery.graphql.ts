/**
 * @generated SignedSource<<5e94ad857604f83ea59bdceeeaebeca6>>
 * @relayHash 4b284b3b24cc3e4a3834277f4d5de347
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4b284b3b24cc3e4a3834277f4d5de347

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAccountClubSupporterSubscriptionQuery$variables = {
  reference: string;
};
export type AdminAccountClubSupporterSubscriptionQueryVariables = AdminAccountClubSupporterSubscriptionQuery$variables;
export type AdminAccountClubSupporterSubscriptionQuery$data = {
  readonly accountClubSupporterSubscription: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionPreviewFragment">;
  } | null;
};
export type AdminAccountClubSupporterSubscriptionQueryResponse = AdminAccountClubSupporterSubscriptionQuery$data;
export type AdminAccountClubSupporterSubscriptionQuery = {
  variables: AdminAccountClubSupporterSubscriptionQueryVariables;
  response: AdminAccountClubSupporterSubscriptionQuery$data;
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "supporterSince",
  "storageKey": null
},
v5 = {
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
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminAccountClubSupporterSubscriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "accountClubSupporterSubscription",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminClubSupporterSubscriptionPreviewFragment"
          },
          (v2/*: any*/)
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
    "name": "AdminAccountClubSupporterSubscriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "accountClubSupporterSubscription",
        "plural": false,
        "selections": [
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isAccountClubSupporterSubscription"
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "IAccountClubSupporterSubscription",
            "abstractKey": "__isIAccountClubSupporterSubscription"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nextBillingDate",
                "storageKey": null
              },
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "type": "AccountActiveClubSupporterSubscription",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
                "storageKey": null
              },
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "type": "AccountCancelledClubSupporterSubscription",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expiredAt",
                "storageKey": null
              },
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "type": "AccountExpiredClubSupporterSubscription",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4b284b3b24cc3e4a3834277f4d5de347",
    "metadata": {},
    "name": "AdminAccountClubSupporterSubscriptionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "71ed31e8951f5e2d946d97f25a74b41e";

export default node;
