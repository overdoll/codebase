/**
 * @generated SignedSource<<bdc1c4f989208e5f7ef465a8b760912e>>
 * @relayHash 5bcf424a00500bdb5f071c0b227497a2
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5bcf424a00500bdb5f071c0b227497a2

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DisableClubCharactersInput = {
  clubId: string;
};
export type StaffDisableClubCharactersButtonMutation$variables = {
  input: DisableClubCharactersInput;
};
export type StaffDisableClubCharactersButtonMutation$data = {
  readonly disableClubCharacters: {
    readonly club: {
      readonly charactersEnabled: boolean;
      readonly charactersLimit: number;
      readonly id: string;
    } | null;
  } | null;
};
export type StaffDisableClubCharactersButtonMutation = {
  response: StaffDisableClubCharactersButtonMutation$data;
  variables: StaffDisableClubCharactersButtonMutation$variables;
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
    "concreteType": "DisableClubCharactersPayload",
    "kind": "LinkedField",
    "name": "disableClubCharacters",
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
    "name": "StaffDisableClubCharactersButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffDisableClubCharactersButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "5bcf424a00500bdb5f071c0b227497a2",
    "metadata": {},
    "name": "StaffDisableClubCharactersButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "10ee74a71034a6ec8f526875b3b9fed7";

export default node;
