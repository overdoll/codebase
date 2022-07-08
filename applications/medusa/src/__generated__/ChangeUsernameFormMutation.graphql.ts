/**
 * @generated SignedSource<<f3cff1c15175c29af005172e4ba74447>>
 * @relayHash b08c509df9c5d937483ae12b42088a19
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b08c509df9c5d937483ae12b42088a19

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAccountUsernameValidation = "USERNAME_TAKEN" | "%future added value";
export type UpdateAccountUsernameInput = {
  username: string;
};
export type ChangeUsernameFormMutation$variables = {
  input: UpdateAccountUsernameInput;
};
export type ChangeUsernameFormMutation$data = {
  readonly updateAccountUsername: {
    readonly account: {
      readonly id: string;
      readonly username: string;
      readonly usernameEditAvailableAt: any;
    } | null;
    readonly validation: UpdateAccountUsernameValidation | null;
  } | null;
};
export type ChangeUsernameFormMutation = {
  response: ChangeUsernameFormMutation$data;
  variables: ChangeUsernameFormMutation$variables;
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "usernameEditAvailableAt",
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
    "id": "b08c509df9c5d937483ae12b42088a19",
    "metadata": {},
    "name": "ChangeUsernameFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "339f85c11a0a99da9f37b1bd09951d9f";

export default node;
