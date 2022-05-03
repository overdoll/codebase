/**
 * @generated SignedSource<<edf9d5048b068f97ce1af32ad092a10b>>
 * @relayHash 1a076d2507314382a54280edc7e60305
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1a076d2507314382a54280edc7e60305

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ClubPayoutStatus = "CANCELLED" | "DEPOSITED" | "FAILED" | "PROCESSING" | "QUEUED" | "%future added value";
export type RetryClubPayoutInput = {
  payoutId: string;
};
export type StaffRetryClubPayoutButtonMutation$variables = {
  input: RetryClubPayoutInput;
};
export type StaffRetryClubPayoutButtonMutationVariables = StaffRetryClubPayoutButtonMutation$variables;
export type StaffRetryClubPayoutButtonMutation$data = {
  readonly retryClubPayout: {
    readonly clubPayout: {
      readonly id: string;
      readonly status: ClubPayoutStatus;
    } | null;
  } | null;
};
export type StaffRetryClubPayoutButtonMutationResponse = StaffRetryClubPayoutButtonMutation$data;
export type StaffRetryClubPayoutButtonMutation = {
  variables: StaffRetryClubPayoutButtonMutationVariables;
  response: StaffRetryClubPayoutButtonMutation$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RetryClubPayoutPayload",
    "kind": "LinkedField",
    "name": "retryClubPayout",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "clubPayout",
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
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffRetryClubPayoutButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffRetryClubPayoutButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "1a076d2507314382a54280edc7e60305",
    "metadata": {},
    "name": "StaffRetryClubPayoutButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "716b977580ab7f975671f867fd7dea04";

export default node;
