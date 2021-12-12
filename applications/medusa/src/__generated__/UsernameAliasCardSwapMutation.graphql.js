/**
 * @flow
 * @relayHash 0744f0a7e98242ce23a322fe245a7b83
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UpdateAccountUsernameAndRetainPreviousInput = {|
  username: string
|};
export type UsernameAliasCardSwapMutationVariables = {|
  input: UpdateAccountUsernameAndRetainPreviousInput
|};
export type UsernameAliasCardSwapMutationResponse = {|
  +updateAccountUsernameAndRetainPrevious: ?{|
    +accountUsername: ?{|
      +account: {|
        +id: string,
        +username: string,
      |}
    |}
  |}
|};
export type UsernameAliasCardSwapMutation = {|
  variables: UsernameAliasCardSwapMutationVariables,
  response: UsernameAliasCardSwapMutationResponse,
|};


/*
mutation UsernameAliasCardSwapMutation(
  $input: UpdateAccountUsernameAndRetainPreviousInput!
) {
  updateAccountUsernameAndRetainPrevious(input: $input) {
    accountUsername {
      account {
        id
        username
      }
      id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernameAliasCardSwapMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAccountUsernameAndRetainPreviousPayload",
        "kind": "LinkedField",
        "name": "updateAccountUsernameAndRetainPrevious",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountUsername",
            "kind": "LinkedField",
            "name": "accountUsername",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsernameAliasCardSwapMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAccountUsernameAndRetainPreviousPayload",
        "kind": "LinkedField",
        "name": "updateAccountUsernameAndRetainPrevious",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountUsername",
            "kind": "LinkedField",
            "name": "accountUsername",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "0744f0a7e98242ce23a322fe245a7b83",
    "metadata": {},
    "name": "UsernameAliasCardSwapMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'c43c922053978fa6c170ff881b3b1ad7';
module.exports = node;
