/**
 * @flow
 * @relayHash 19074e145ea3693b4deec1aef41b4aed
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type DeleteAccountUsernameInput = {|
  accountUsernameId: string
|};
export type UsernameAliasCardDeleteMutationVariables = {|
  input: DeleteAccountUsernameInput,
  connections: $ReadOnlyArray<string>,
|};
export type UsernameAliasCardDeleteMutationResponse = {|
  +deleteAccountUsername: ?{|
    +accountUsernameId: string
  |}
|};
export type UsernameAliasCardDeleteMutation = {|
  variables: UsernameAliasCardDeleteMutationVariables,
  response: UsernameAliasCardDeleteMutationResponse,
|};


/*
mutation UsernameAliasCardDeleteMutation(
  $input: DeleteAccountUsernameInput!
) {
  deleteAccountUsername(input: $input) {
    accountUsernameId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accountUsernameId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernameAliasCardDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteAccountUsernamePayload",
        "kind": "LinkedField",
        "name": "deleteAccountUsername",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UsernameAliasCardDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteAccountUsernamePayload",
        "kind": "LinkedField",
        "name": "deleteAccountUsername",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "accountUsernameId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "19074e145ea3693b4deec1aef41b4aed",
    "metadata": {},
    "name": "UsernameAliasCardDeleteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'c48d1771f7317991126add3ef99299f8';
module.exports = node;
