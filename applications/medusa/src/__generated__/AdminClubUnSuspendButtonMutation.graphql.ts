/**
 * @generated SignedSource<<c913d0c7778a82fd25098407d36bb5c4>>
 * @relayHash f9d5bc9e2e6de73960ea2fae5ca53b8f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f9d5bc9e2e6de73960ea2fae5ca53b8f

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
    "id": "f9d5bc9e2e6de73960ea2fae5ca53b8f",
    "metadata": {},
    "name": "StaffClubUnSuspendButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0f6d98ff88be4c4a94c746c35f857af8";

export default node;
