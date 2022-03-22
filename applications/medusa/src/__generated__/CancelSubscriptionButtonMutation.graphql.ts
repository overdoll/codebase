/**
 * @generated SignedSource<<556a5129fab55fbbf5da7e4e7a9949e1>>
 * @relayHash 5ef6d233040bc6fc254bcde98d436e59
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5ef6d233040bc6fc254bcde98d436e59

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
      readonly account?: {
        readonly id: string;
      };
      readonly endDate?: any;
      readonly cancelledAt?: any;
      readonly cancellationReason?: {
        readonly id: string;
        readonly title: string;
      } | null;
      readonly updatedAt?: any;
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
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cancelledAt",
      "storageKey": null
    },
    {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "clubSupporterSubscription",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/)
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "clubSupporterSubscription",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v3/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "5ef6d233040bc6fc254bcde98d436e59",
    "metadata": {},
    "name": "CancelSubscriptionButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "cdc2d7e646d8abd463d344f2da3e0974";

export default node;
