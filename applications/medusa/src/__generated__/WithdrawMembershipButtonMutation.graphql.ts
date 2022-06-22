/**
 * @generated SignedSource<<465d31c95ae53464f2357241764f5f14>>
 * @relayHash a0fad07776196ade427749cd66960d32
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a0fad07776196ade427749cd66960d32

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type WithdrawMembershipButtonMutation$variables = {
  clubId: string;
};
export type WithdrawMembershipButtonMutation$data = {
  readonly leaveClub: {
    readonly clubMemberId: string;
  } | null;
};
export type WithdrawMembershipButtonMutation = {
  response: WithdrawMembershipButtonMutation$data;
  variables: WithdrawMembershipButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clubId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "clubId",
            "variableName": "clubId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "LeaveClubPayload",
    "kind": "LinkedField",
    "name": "leaveClub",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clubMemberId",
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
    "name": "WithdrawMembershipButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WithdrawMembershipButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a0fad07776196ade427749cd66960d32",
    "metadata": {},
    "name": "WithdrawMembershipButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "80cf7f868860c15a9562d5e2fc3f550f";

export default node;
