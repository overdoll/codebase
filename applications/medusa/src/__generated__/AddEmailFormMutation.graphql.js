/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type AddAccountEmailValidation = "INVALID_EMAIL" | "%future added value";
export type AddAccountEmailInput = {|
  email: string
|};
export type AddEmailFormMutationVariables = {|
  input: AddAccountEmailInput,
  connections: $ReadOnlyArray<string>,
|};
export type AddEmailFormMutationResponse = {|
  +addAccountEmail: ?{|
    +validation: ?AddAccountEmailValidation,
    +accountEmail: ?{|
      +id: string,
      +email: string,
      +status: AccountEmailStatus,
    |},
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
    validation
    accountEmail {
      id
      email
      status
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountEmail",
  "kind": "LinkedField",
  "name": "accountEmail",
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddEmailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AddAccountEmailPayload",
        "kind": "LinkedField",
        "name": "addAccountEmail",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AddEmailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AddAccountEmailPayload",
        "kind": "LinkedField",
        "name": "addAccountEmail",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "accountEmail",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "updateEmailPrimaryEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d2ac99964b4f17311f5408705dd8c403",
    "id": null,
    "metadata": {},
    "name": "AddEmailFormMutation",
    "operationKind": "mutation",
    "text": "mutation AddEmailFormMutation(\n  $input: AddAccountEmailInput!\n) {\n  addAccountEmail(input: $input) {\n    validation\n    accountEmail {\n      id\n      email\n      status\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '073ddf0665b308e37bc490bc54d8d4fc';
module.exports = node;
