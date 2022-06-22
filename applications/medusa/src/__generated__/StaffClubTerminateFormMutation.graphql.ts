/**
 * @generated SignedSource<<5af1b9b00bc70c5ffbdd5ab3a13da453>>
 * @relayHash 4363557719e3fc856fc9670127b240ff
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4363557719e3fc856fc9670127b240ff

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TerminateClubInput = {
  clubId: string;
};
export type StaffClubTerminateFormMutation$variables = {
  input: TerminateClubInput;
};
export type StaffClubTerminateFormMutation$data = {
  readonly terminateClub: {
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
export type StaffClubTerminateFormMutation = {
  response: StaffClubTerminateFormMutation$data;
  variables: StaffClubTerminateFormMutation$variables;
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
    "concreteType": "TerminateClubPayload",
    "kind": "LinkedField",
    "name": "terminateClub",
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
    "name": "StaffClubTerminateFormMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffClubTerminateFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "4363557719e3fc856fc9670127b240ff",
    "metadata": {},
    "name": "StaffClubTerminateFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "9f4e467f9a53b076db99c4fe62b58aee";

export default node;
