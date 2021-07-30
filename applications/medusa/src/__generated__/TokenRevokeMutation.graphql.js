/**
 * @flow
 * @relayHash aea89838ddd1493d2c2fb6c9ac58af5a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RevokeAuthenticationTokenInput = {|
  authenticationTokenId?: ?string
|};
export type TokenRevokeMutationVariables = {|
  input: RevokeAuthenticationTokenInput
|};
export type TokenRevokeMutationResponse = {|
  +revokeAuthenticationToken: ?{|
    +revokedAuthenticationTokenId: string
  |}
|};
export type TokenRevokeMutation = {|
  variables: TokenRevokeMutationVariables,
  response: TokenRevokeMutationResponse,
|};


/*
mutation TokenRevokeMutation(
  $input: RevokeAuthenticationTokenInput!
) {
  revokeAuthenticationToken(input: $input) {
    revokedAuthenticationTokenId
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
    "concreteType": "RevokeAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "revokeAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "revokedAuthenticationTokenId",
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
    "name": "TokenRevokeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenRevokeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "aea89838ddd1493d2c2fb6c9ac58af5a",
    "metadata": {},
    "name": "TokenRevokeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '8c3b1b234a36862c28e4afe7b27f5c04';
module.exports = node;
