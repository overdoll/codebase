/**
 * @flow
 * @relayHash ff65388b538e34d122adce5d9a2c75f0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RegisterMutationVariables = {|
  username: string
|};
export type RegisterMutationResponse = {|
  +register: boolean
|};
export type RegisterMutation = {|
  variables: RegisterMutationVariables,
  response: RegisterMutationResponse,
|};
*/


/*
mutation RegisterMutation(
  $username: String!
) {
  register(username: $username)
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "kind": "ScalarField",
    "name": "register",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegisterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "8b821ef05a5415187508346d8e872825b993257ecb5e209246d23bb8302fe3cd",
    "metadata": {},
    "name": "RegisterMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dd9f305c44c983b7fd0e178d001ac303';

module.exports = node;
