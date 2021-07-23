/**
 * @flow
 * @relayHash 6a1afe68a83923800a9962fb57b999ba
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AddAccountEmailInput = {|
  email: string
|};
export type EmailsPrimaryMutationVariables = {|
  input: AddAccountEmailInput
|};
export type EmailsPrimaryMutationResponse = {|
  +addAccountEmail: ?{|
    +accountEmail: ?{|
      +id: string
    |}
  |}
|};
export type EmailsPrimaryMutation = {|
  variables: EmailsPrimaryMutationVariables,
  response: EmailsPrimaryMutationResponse,
|};


/*
mutation EmailsPrimaryMutation(
  $input: AddAccountEmailInput!
) {
  addAccountEmail(input: $input) {
    accountEmail {
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EmailsPrimaryMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EmailsPrimaryMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "6a1afe68a83923800a9962fb57b999ba",
    "metadata": {},
    "name": "EmailsPrimaryMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '8e40a028df80fee225c2f07b12edf7c2';
module.exports = node;
