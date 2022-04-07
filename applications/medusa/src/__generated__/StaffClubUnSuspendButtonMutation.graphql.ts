/**
 * @generated SignedSource<<4d02c58e333aa3c1a21b6c657e2033c3>>
 * @relayHash c0e97711fcf2c951653c769034820e6c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c0e97711fcf2c951653c769034820e6c

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnSuspendClubInput = {
  clubId: string;
};
export type StaffClubUnSuspendButtonMutation$variables = {
  input: UnSuspendClubInput;
};
export type StaffClubUnSuspendButtonMutationVariables = StaffClubUnSuspendButtonMutation$variables;
export type StaffClubUnSuspendButtonMutation$data = {
  readonly unSuspendClub: {
    readonly club: {
      readonly id: string;
      readonly suspension: {
        readonly expires: any;
      } | null;
    } | null;
  } | null;
};
export type StaffClubUnSuspendButtonMutationResponse = StaffClubUnSuspendButtonMutation$data;
export type StaffClubUnSuspendButtonMutation = {
  variables: StaffClubUnSuspendButtonMutationVariables;
  response: StaffClubUnSuspendButtonMutation$data;
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
    "concreteType": "UnSuspendClubPayload",
    "kind": "LinkedField",
    "name": "unSuspendClub",
    "plural": false,
    "selections": [
      {
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubSuspension",
            "kind": "LinkedField",
            "name": "suspension",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
            ],
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
    "name": "StaffClubUnSuspendButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffClubUnSuspendButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c0e97711fcf2c951653c769034820e6c",
    "metadata": {},
    "name": "StaffClubUnSuspendButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2604a4233f38b05408c1f5834b3913e7";

export default node;
