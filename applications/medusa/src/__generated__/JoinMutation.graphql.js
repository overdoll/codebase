/**
 * @flow
 * @relayHash 15a1100e058f423bcbab9b335a89298c
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAuthenticationTokenInput = {|
  email: string
|};
export type JoinMutationVariables = {|
  input: GrantAuthenticationTokenInput
|};
export type JoinMutationResponse = {|
  +grantAuthenticationToken: ?{|
    +authenticationToken: ?{|
      +id: string,
      +email: string,
    |}
  |}
|};
export type JoinMutation = {|
  variables: JoinMutationVariables,
  response: JoinMutationResponse,
|};


/*
mutation JoinMutation(
  $input: GrantAuthenticationTokenInput!
) {
  grantAuthenticationToken(input: $input) {
    authenticationToken {
      id
      email
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
    "concreteType": "GrantAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "grantAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "authenticationToken",
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
    "name": "JoinMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "15a1100e058f423bcbab9b335a89298c",
    "metadata": {},
    "name": "JoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '9cb300dc3302b296216a469d3d9d932c';
module.exports = node;
