/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 17a681f12d930b2483084c29da4c5bcc */

import { ConcreteRequest } from "relay-runtime";
export type UpdateAccountUsernameAndRetainPreviousValidation = "USERNAME_TAKEN" | "%future added value";
export type UpdateAccountUsernameAndRetainPreviousInput = {
    username: string;
};
export type ChangeUsernameFormMutationVariables = {
    input: UpdateAccountUsernameAndRetainPreviousInput;
};
export type ChangeUsernameFormMutationResponse = {
    readonly updateAccountUsernameAndRetainPrevious: {
        readonly validation: UpdateAccountUsernameAndRetainPreviousValidation | null;
        readonly accountUsername: {
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
  $input: UpdateAccountUsernameAndRetainPreviousInput!
) {
  updateAccountUsernameAndRetainPrevious(input: $input) {
    validation
    accountUsername {
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
    "concreteType": "UpdateAccountUsernameAndRetainPreviousPayload",
    "kind": "LinkedField",
    "name": "updateAccountUsernameAndRetainPrevious",
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
        "concreteType": "AccountUsername",
        "kind": "LinkedField",
        "name": "accountUsername",
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
    "id": "17a681f12d930b2483084c29da4c5bcc",
    "metadata": {},
    "name": "ChangeUsernameFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'ab15ae19988bc34660ba742f1c646005';
export default node;
