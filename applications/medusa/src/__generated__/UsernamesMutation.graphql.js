/**
 * @flow
 * @relayHash 691adccd4edb11164512383708bd7442
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UpdateAccountUsernameAndRetainPreviousInput = {|
  username: string
|};
export type UsernamesMutationVariables = {|
  input: UpdateAccountUsernameAndRetainPreviousInput
|};
export type UsernamesMutationResponse = {|
  +updateAccountUsernameAndRetainPrevious: ?{|
    +accountUsername: ?{|
      +username: string,
      +account: {|
        +id: string,
        +username: string,
      |},
    |}
  |}
|};
export type UsernamesMutation = {|
  variables: UsernamesMutationVariables,
  response: UsernamesMutationResponse,
|};


/*
mutation UsernamesMutation(
  $input: UpdateAccountUsernameAndRetainPreviousInput!
) {
  updateAccountUsernameAndRetainPrevious(input: $input) {
    accountUsername {
      username
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
  "name": "username",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernamesMutation",
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
              (v2/*: any*/),
              (v4/*: any*/)
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
    "name": "UsernamesMutation",
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
              (v2/*: any*/),
              (v4/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "691adccd4edb11164512383708bd7442",
    "metadata": {},
    "name": "UsernamesMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'b736b1ed45761242a6b84217f520b338';
module.exports = node;
