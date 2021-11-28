/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RevokeAuthenticationTokenInput = {|
  authenticationTokenId?: ?string
|};
export type ConfirmRevokeMutationVariables = {|
  input: RevokeAuthenticationTokenInput
|};
export type ConfirmRevokeMutationResponse = {|
  +revokeAuthenticationToken: ?{|
    +revokedAuthenticationTokenId: string
  |}
|};
export type ConfirmRevokeMutation = {|
  variables: ConfirmRevokeMutationVariables,
  response: ConfirmRevokeMutationResponse,
|};


/*
mutation ConfirmRevokeMutation(
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
    "name": "ConfirmRevokeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmRevokeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "66447af1fee23a4edaee4700871549be",
    "id": null,
    "metadata": {},
    "name": "ConfirmRevokeMutation",
    "operationKind": "mutation",
    "text": "mutation ConfirmRevokeMutation(\n  $input: RevokeAuthenticationTokenInput!\n) {\n  revokeAuthenticationToken(input: $input) {\n    revokedAuthenticationTokenId\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e5406e58e44e3c174d71eccac9d38e61';
module.exports = node;
