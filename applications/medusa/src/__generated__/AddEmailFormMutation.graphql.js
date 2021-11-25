/**
 * @flow
 * @relayHash 11225120e6fd1210cdd23abd0729955a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
<<<<<<< HEAD
=======
export type AddAccountEmailValidation = "INVALID_EMAIL" | "%future added value";
>>>>>>> master
export type AddAccountEmailInput = {|
  email: string
|};
export type AddEmailFormMutationVariables = {|
  input: AddAccountEmailInput,
  connections: $ReadOnlyArray<string>,
|};
export type AddEmailFormMutationResponse = {|
  +addAccountEmail: ?{|
    +accountEmail: ?{|
      +id: string,
      +email: string,
      +status: AccountEmailStatus,
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
          (v3/*: any*/)
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
    "id": "11225120e6fd1210cdd23abd0729955a",
    "metadata": {},
    "name": "AddEmailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '6f834357fde2d17150f8079d8054e0c2';
module.exports = node;
