/**
 * @generated SignedSource<<badf93f11604f1a33b5d89885b11f028>>
 * @relayHash 677958463b8367287e569a1e90279a90
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 677958463b8367287e569a1e90279a90

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
    readonly __typename: "EnableClubCharactersPayload";
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
        "kind": "ScalarField",
        "name": "__typename",
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
    "id": "677958463b8367287e569a1e90279a90",
    "metadata": {},
    "name": "StaffEnableClubCharactersButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "de051d5361c7f5ec7c280f245d59e33a";

export default node;
