/**
 * @flow
 * @relayHash 43a3cfd5ee145445e574ff646593c65f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinRootMutationVariables = {|
  email: string
|};
export type JoinRootMutationResponse = {|
  +authenticate: ?{|
    +success: boolean
  |}
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
  authenticate(email: $email) {
    success
  }
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
    "concreteType": "Authentication",
    "kind": "LinkedField",
    "name": "authenticate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
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
    "id": "bc3fee639867972e033491bc2bddb70e03e9e6545ec430da901bf2f5d5562858",
    "metadata": {},
    "name": "JoinRootMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c5d453c53788a1c21c87cb4d6533ce56';

module.exports = node;
