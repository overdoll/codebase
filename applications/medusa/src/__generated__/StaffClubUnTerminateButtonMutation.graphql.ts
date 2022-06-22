/**
 * @generated SignedSource<<6cf25846ef7dd3ebbc956ae12c8dcb4c>>
 * @relayHash 15ecc3716945ffc3d5da7e9c7555f30e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 15ecc3716945ffc3d5da7e9c7555f30e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnTerminateClubInput = {
  clubId: string;
};
export type StaffClubUnTerminateButtonMutation$variables = {
  input: UnTerminateClubInput;
};
export type StaffClubUnTerminateButtonMutation$data = {
  readonly unTerminateClub: {
    readonly club: {
      readonly id: string;
      readonly termination: {
        readonly account: {
          readonly id: string;
          readonly username: string;
        };
      } | null;
    } | null;
  } | null;
};
export type StaffClubUnTerminateButtonMutation = {
  response: StaffClubUnTerminateButtonMutation$data;
  variables: StaffClubUnTerminateButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UnTerminateClubPayload",
    "kind": "LinkedField",
    "name": "unTerminateClub",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubTermination",
            "kind": "LinkedField",
            "name": "termination",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "account",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "username",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffClubUnTerminateButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffClubUnTerminateButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "15ecc3716945ffc3d5da7e9c7555f30e",
    "metadata": {},
    "name": "StaffClubUnTerminateButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "00bfea0dae0a95af6c08b0d11fa83ce9";

export default node;
