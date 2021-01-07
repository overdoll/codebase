/**
 * @flow
 * @relayHash b8d6a45958e94c78ef4cc8048a1996ae
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinRootMutationVariables = {|
  email: string
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
  $email: String!
) {
  authenticate(email: $email)
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "id": "93bff606cbc51db70befad8600f1e273a52fb645cc9f3b9ebc70821770131470",
    "metadata": {},
    "name": "JoinRootMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '208adc4755a5855bb44587f4c92a5640';

module.exports = node;
