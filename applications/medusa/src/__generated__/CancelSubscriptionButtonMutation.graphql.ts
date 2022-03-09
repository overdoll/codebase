/**
 * @generated SignedSource<<e8b5a816b9fe318435ff2170add01f27>>
 * @relayHash 439c7e72af6e57a441139141ea7de8e3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 439c7e72af6e57a441139141ea7de8e3

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AccountClubSupporterSubscriptionStatus = "ACTIVE" | "CANCELLED" | "%future added value";
export type CancelAccountClubSupporterSubscriptionInput = {
  cancellationReasonId: string;
  clubSupporterSubscriptionId: string;
};
export type CancelSubscriptionButtonMutation$variables = {
  input: CancelAccountClubSupporterSubscriptionInput;
};
export type CancelSubscriptionButtonMutationVariables = CancelSubscriptionButtonMutation$variables;
export type CancelSubscriptionButtonMutation$data = {
  readonly cancelAccountClubSupporterSubscription: {
    readonly clubSupporterSubscription: {
      readonly account: {
        readonly id: string;
      };
      readonly status: AccountClubSupporterSubscriptionStatus;
      readonly cancelledAt: any | null;
      readonly cancellationReason: {
        readonly id: string;
        readonly title: string;
      } | null;
      readonly updatedAt: any;
      readonly lastBillingDate: any;
    } | null;
  } | null;
};
export type CancelSubscriptionButtonMutationResponse = CancelSubscriptionButtonMutation$data;
export type CancelSubscriptionButtonMutation = {
  variables: CancelSubscriptionButtonMutationVariables;
  response: CancelSubscriptionButtonMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cancelledAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "CancellationReason",
  "kind": "LinkedField",
  "name": "cancellationReason",
  "plural": false,
  "selections": [
    (v2/*: any*/),
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastBillingDate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CancelSubscriptionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CancelAccountClubSupporterSubscriptionPayload",
        "kind": "LinkedField",
        "name": "cancelAccountClubSupporterSubscription",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountClubSupporterSubscription",
            "kind": "LinkedField",
            "name": "clubSupporterSubscription",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CancelSubscriptionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CancelAccountClubSupporterSubscriptionPayload",
        "kind": "LinkedField",
        "name": "cancelAccountClubSupporterSubscription",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountClubSupporterSubscription",
            "kind": "LinkedField",
            "name": "clubSupporterSubscription",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "439c7e72af6e57a441139141ea7de8e3",
    "metadata": {},
    "name": "CancelSubscriptionButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0b69a5a1a2ae6ed59b124c2d459524ad";

export default node;
