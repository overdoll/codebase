/**
 * @flow
 * @relayHash a8244d934f532f8ed92a84be68e4a474
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AuthenticationInput = {|
  email: string
|};
export type JoinRootMutationVariables = {|
  data: AuthenticationInput
|};
export type JoinRootMutationResponse = {|
  +authenticate: boolean
|};
export type JoinRootMutation = {|
  variables: JoinRootMutationVariables,
  response: JoinRootMutationResponse,
|};
*/


/*
mutation JoinRootMutation(
  $data: AuthenticationInput!
) {
  authenticate(data: $data)
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "kind": "ScalarField",
    "name": "authenticate",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinRootMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinRootMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "01811b6d26104d994f74605d5f80e269a08f21c2b556c714be21b61d202c6b3f",
    "metadata": {},
    "name": "JoinRootMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f4026d12cb5bf06213009d3f143e4109';

module.exports = node;
