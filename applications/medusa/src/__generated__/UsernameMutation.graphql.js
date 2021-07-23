/**
 * @flow
 * @relayHash deb3147ea0adf0a240175c6452890991
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UpdateAccountUsernameAndRetainPreviousInput = {|
  username: string
|};
export type UsernameMutationVariables = {|
  input: UpdateAccountUsernameAndRetainPreviousInput
|};
export type UsernameMutationResponse = {|
  +updateAccountUsernameAndRetainPrevious: ?{|
    +accountUsername: ?{|
      +username: string
    |}
  |}
|};
export type UsernameMutation = {|
  variables: UsernameMutationVariables,
  response: UsernameMutationResponse,
|};


/*
mutation UsernameMutation(
  $input: UpdateAccountUsernameAndRetainPreviousInput!
) {
  updateAccountUsernameAndRetainPrevious(input: $input) {
    accountUsername {
      username
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsernameMutation",
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
              (v2/*: any*/)
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
    "name": "UsernameMutation",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "deb3147ea0adf0a240175c6452890991",
    "metadata": {},
    "name": "UsernameMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '99f88bf5481c287fbcd8888293ed00c2';
module.exports = node;
