/**
 * @flow
 * @relayHash 94d4557e6a50a40166e9403b238eb1a2
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AddEmailFormMutationVariables = {|
  email: string
|};
export type AddEmailFormMutationResponse = {|
  +addAccountEmail: {|
    +ok: boolean,
    +validation: ?{|
      +code: string
    |},
  |}
|};
export type AddEmailFormMutation = {|
  variables: AddEmailFormMutationVariables,
  response: AddEmailFormMutationResponse,
|};


/*
mutation AddEmailFormMutation(
  $email: String!
) {
  addAccountEmail(email: $email) {
    ok
    validation {
      code
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "concreteType": "Response",
    "kind": "LinkedField",
    "name": "addAccountEmail",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Validation",
        "kind": "LinkedField",
        "name": "validation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
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
    "name": "AddEmailFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddEmailFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "94d4557e6a50a40166e9403b238eb1a2",
    "metadata": {},
    "name": "AddEmailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '9570b9ded7364eb6e7a61f14027a682d';
module.exports = node;
