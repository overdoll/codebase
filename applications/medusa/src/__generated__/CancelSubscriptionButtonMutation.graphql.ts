/**
 * @generated SignedSource<<dc1763562912c01a8c2ccc0b0457e925>>
 * @relayHash 6c7fca1a4d934d8d19a1ac7245691311
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6c7fca1a4d934d8d19a1ac7245691311

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
      readonly __id: string;
      readonly __typename: string;
      readonly id?: string;
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
v4 = [
  (v3/*: any*/)
],
v5 = {
  "kind": "InlineFragment",
  "selections": (v4/*: any*/),
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
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
        (v3/*: any*/),
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
v7 = {
  "kind": "InlineFragment",
  "selections": (v4/*: any*/),
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
},
v8 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
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
              (v2/*: any*/),
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "clubSupporterSubscription",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "Node",
                "abstractKey": "__isNode"
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "6c7fca1a4d934d8d19a1ac7245691311",
    "metadata": {},
    "name": "CancelSubscriptionButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "f7ec45485cfaa3200c5e668d999bcb1a";

export default node;
