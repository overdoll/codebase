/**
 * @flow
 * @relayHash f1604fee51167235daafe362f3b58e6a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AuthenticationInput = {|
  email: string
|};
export type JoinMutationVariables = {|
  data: AuthenticationInput
|};
export type JoinMutationResponse = {|
  +authenticate: {|
    +ok: boolean
  |}
|};
export type JoinMutation = {|
  variables: JoinMutationVariables,
  response: JoinMutationResponse,
|};


/*
mutation JoinMutation(
  $data: AuthenticationInput!
) {
  authenticate(data: $data) {
    ok
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      }
    ],
    "concreteType": "Response",
    "kind": "LinkedField",
    "name": "authenticate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
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
    "id": "f1604fee51167235daafe362f3b58e6a",
    "metadata": {},
    "name": "JoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '74e50d9a9bf4fd8efac9a08300ebf1de';
module.exports = node;
