/**
 * @flow
 * @relayHash 2d0267655c32497ae017e707ecbb2341
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AddAccountEmailInput = {|
  email: string
|};
export type AddEmailFormMutationVariables = {|
  input: AddAccountEmailInput
|};
export type AddEmailFormMutationResponse = {|
  +addAccountEmail: ?{|
    +accountEmail: ?{|
      +email: string
    |}
  |}
|};
export type AddEmailFormMutation = {|
  variables: AddEmailFormMutationVariables,
  response: AddEmailFormMutationResponse,
|};


/*
mutation AddEmailFormMutation(
  $input: AddAccountEmailInput!
) {
  addAccountEmail(input: $input) {
    accountEmail {
      email
      id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddEmailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddAccountEmailPayload",
        "kind": "LinkedField",
        "name": "addAccountEmail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEmail",
            "kind": "LinkedField",
            "name": "accountEmail",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddEmailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddAccountEmailPayload",
        "kind": "LinkedField",
        "name": "addAccountEmail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEmail",
            "kind": "LinkedField",
            "name": "accountEmail",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "2d0267655c32497ae017e707ecbb2341",
    "metadata": {},
    "name": "AddEmailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '8af2b46c386e64807d5b7654c52cdb8f';
module.exports = node;
