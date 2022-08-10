/**
 * @generated SignedSource<<84668153555ea6cf4ae32932af21176c>>
 * @relayHash d48e2f27afc9a31e3d2e9bd1bc4a687f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d48e2f27afc9a31e3d2e9bd1bc4a687f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableClubCharactersInput = {
  charactersLimit: number;
  clubId: string;
};
export type StaffEnableClubCharactersButtonMutation$variables = {
  input: EnableClubCharactersInput;
};
export type StaffEnableClubCharactersButtonMutation$data = {
  readonly enableClubCharacters: {
    readonly club: {
      readonly charactersEnabled: boolean;
      readonly charactersLimit: number;
      readonly id: string;
    } | null;
  } | null;
};
export type StaffEnableClubCharactersButtonMutation = {
  response: StaffEnableClubCharactersButtonMutation$data;
  variables: StaffEnableClubCharactersButtonMutation$variables;
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
    "concreteType": "EnableClubCharactersPayload",
    "kind": "LinkedField",
    "name": "enableClubCharacters",
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
            "kind": "ScalarField",
            "name": "charactersEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "charactersLimit",
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
    "name": "StaffEnableClubCharactersButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffEnableClubCharactersButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d48e2f27afc9a31e3d2e9bd1bc4a687f",
    "metadata": {},
    "name": "StaffEnableClubCharactersButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "35bc78a507b65b37e6b2af9c030a519a";

export default node;
