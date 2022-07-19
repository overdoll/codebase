/**
 * @generated SignedSource<<5fd2c5bf98f97de6974834b34c433788>>
 * @relayHash 0d2c66822590bcbd14db497aa839c21a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0d2c66822590bcbd14db497aa839c21a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ClubLeaveWrapperMutation$variables = {
  clubId: string;
};
export type ClubLeaveWrapperMutation$data = {
  readonly leaveClub: {
    readonly clubMemberId: string;
  } | null;
};
export type ClubLeaveWrapperMutation = {
  response: ClubLeaveWrapperMutation$data;
  variables: ClubLeaveWrapperMutation$variables;
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
    "name": "ClubLeaveWrapperMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClubLeaveWrapperMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0d2c66822590bcbd14db497aa839c21a",
    "metadata": {},
    "name": "ClubLeaveWrapperMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e9588c6aa147269fd3599773b1d7d942";

export default node;
