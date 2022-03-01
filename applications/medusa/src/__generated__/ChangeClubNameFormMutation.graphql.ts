/**
 * @generated SignedSource<<c10acf3f808033e07c7ec9292fdcb384>>
 * @relayHash a4f2ddd3c39a36e038577fa110701b43
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a4f2ddd3c39a36e038577fa110701b43

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateClubNameInput = {
  id: string;
  name: string;
};
export type ChangeClubNameFormMutation$variables = {
  input: UpdateClubNameInput;
};
export type ChangeClubNameFormMutationVariables = ChangeClubNameFormMutation$variables;
export type ChangeClubNameFormMutation$data = {
  readonly updateClubName: {
    readonly club: {
      readonly id: string;
      readonly name: string;
    } | null;
  } | null;
};
export type ChangeClubNameFormMutationResponse = ChangeClubNameFormMutation$data;
export type ChangeClubNameFormMutation = {
  variables: ChangeClubNameFormMutationVariables;
  response: ChangeClubNameFormMutation$data;
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
    "concreteType": "UpdateClubNamePayload",
    "kind": "LinkedField",
    "name": "updateClubName",
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
            "name": "name",
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
    "name": "ChangeClubNameFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeClubNameFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a4f2ddd3c39a36e038577fa110701b43",
    "metadata": {},
    "name": "ChangeClubNameFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ef85fa165af3da645348a7c5832096ae";

export default node;
