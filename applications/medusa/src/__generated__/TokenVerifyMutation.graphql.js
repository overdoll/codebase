/**
 * @flow
 * @relayHash 927eb3e579f178c085a0407b9dc03c74
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type RevokeAuthenticationTokenInput = {|
  authenticationTokenId?: ?string
|};
export type TokenVerifyMutationVariables = {|
  input: RevokeAuthenticationTokenInput
|};
export type TokenVerifyMutationResponse = {|
  +revokeAuthenticationToken: ?{|
    +revokedAuthenticationTokenId: string
  |}
|};
export type TokenVerifyMutation = {|
  variables: TokenVerifyMutationVariables,
  response: TokenVerifyMutationResponse,
|};


/*
mutation TokenVerifyMutation(
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
    "name": "TokenVerifyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenVerifyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "927eb3e579f178c085a0407b9dc03c74",
    "metadata": {},
    "name": "TokenVerifyMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'a6d2cae3d767671f209be8bddef2760d';
module.exports = node;
