/**
 * @generated SignedSource<<352625cc9f00fad1772cd6e7c225b4d6>>
 * @relayHash f32f4a26839218a074c117a378e05f8e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f32f4a26839218a074c117a378e05f8e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ClubPayoutStatus = "CANCELLED" | "DEPOSITED" | "FAILED" | "PROCESSING" | "QUEUED" | "%future added value";
export type CancelClubPayoutInput = {
  payoutId: string;
};
export type StaffCancelClubPayoutButtonMutation$variables = {
  input: CancelClubPayoutInput;
};
export type StaffCancelClubPayoutButtonMutation$data = {
  readonly cancelClubPayout: {
    readonly clubPayout: {
      readonly id: string;
      readonly status: ClubPayoutStatus;
    } | null;
  } | null;
};
export type StaffCancelClubPayoutButtonMutation = {
  response: StaffCancelClubPayoutButtonMutation$data;
  variables: StaffCancelClubPayoutButtonMutation$variables;
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
    "concreteType": "CancelClubPayoutPayload",
    "kind": "LinkedField",
    "name": "cancelClubPayout",
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
    "name": "StaffCancelClubPayoutButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffCancelClubPayoutButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "f32f4a26839218a074c117a378e05f8e",
    "metadata": {},
    "name": "StaffCancelClubPayoutButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "19bfb5750dad2737d0793d9d4ce61337";

export default node;
