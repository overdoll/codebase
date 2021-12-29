/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 89ac26f06f90d11edac8563669fc1603 */

import { ConcreteRequest } from "relay-runtime";
export type UpdateAccountUsernameValidation = "USERNAME_TAKEN" | "%future added value";
export type UpdateAccountUsernameInput = {
    username: string;
};
export type ChangeUsernameFormMutationVariables = {
    input: UpdateAccountUsernameInput;
};
export type ChangeUsernameFormMutationResponse = {
    readonly updateAccountUsername: {
        readonly validation: UpdateAccountUsernameValidation | null;
        readonly account: {
            readonly id: string;
            readonly username: string;
        } | null;
    } | null;
};
export type ChangeUsernameFormMutation = {
    readonly response: ChangeUsernameFormMutationResponse;
    readonly variables: ChangeUsernameFormMutationVariables;
};



/*
mutation ChangeUsernameFormMutation(
  $input: UpdateAccountUsernameInput!
) {
  updateAccountUsername(input: $input) {
    validation
    account {
      id
      username
    }
  }
}
*/

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
    "concreteType": "UpdateAccountUsernamePayload",
    "kind": "LinkedField",
    "name": "updateAccountUsername",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validation",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
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
            "name": "username",
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
    "name": "ChangeUsernameFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeUsernameFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "89ac26f06f90d11edac8563669fc1603",
    "metadata": {},
    "name": "ChangeUsernameFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '39f8a280199ca1dd27b9ede397eab53b';
export default node;
