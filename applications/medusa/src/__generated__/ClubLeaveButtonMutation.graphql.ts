/**
 * @generated SignedSource<<663a21b55230468b529041a47f12aecb>>
 * @relayHash a82eb188448d9ef2efe4522b5b2c4486
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a82eb188448d9ef2efe4522b5b2c4486

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ClubLeaveButtonMutation$variables = {
  clubId: string;
};
export type ClubLeaveButtonMutation$data = {
  readonly leaveClub: {
    readonly clubMemberId: string;
  } | null;
};
export type ClubLeaveButtonMutation = {
  response: ClubLeaveButtonMutation$data;
  variables: ClubLeaveButtonMutation$variables;
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
    "name": "ClubLeaveButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClubLeaveButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a82eb188448d9ef2efe4522b5b2c4486",
    "metadata": {},
    "name": "ClubLeaveButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "bdf038c7d17b73f7322184dd0523135c";

export default node;
