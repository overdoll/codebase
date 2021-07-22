/**
 * @flow
 * @relayHash a35c1230ccf4691b6f6652628197ffac
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UsernameMutationVariables = {|
  username: string
|};
export type UsernameMutationResponse = {|
  +modifyAccountUsername: {|
    +ok: boolean,
    +validation: ?{|
      +code: string
    |},
  |}
|};
export type UsernameMutation = {|
  variables: UsernameMutationVariables,
  response: UsernameMutationResponse,
|};


/*
mutation UsernameMutation(
  $username: String!
) {
  modifyAccountUsername(username: $username) {
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
    "name": "username"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "Response",
    "kind": "LinkedField",
    "name": "modifyAccountUsername",
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
    "name": "UsernameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsernameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a35c1230ccf4691b6f6652628197ffac",
    "metadata": {},
    "name": "UsernameMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '7b799b50bcd48957663f9086c939970e';
module.exports = node;
