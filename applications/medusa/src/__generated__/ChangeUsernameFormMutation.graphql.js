/**
 * @flow
 * @relayHash 9a2b14d6b1fcc87a88391e8c8f9e7460
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type UpdateAccountUsernameAndRetainPreviousValidation = "USERNAME_TAKEN" | "%future added value";
export type UpdateAccountUsernameAndRetainPreviousInput = {|
  username: string
|};
export type ChangeUsernameFormMutationVariables = {|
  input: UpdateAccountUsernameAndRetainPreviousInput,
  connections: $ReadOnlyArray<string>,
|};
export type ChangeUsernameFormMutationResponse = {|
  +updateAccountUsernameAndRetainPrevious: ?{|
    +validation: ?UpdateAccountUsernameAndRetainPreviousValidation,
    +accountUsername: ?{|
      +id: string,
      +username: string,
      +account: {|
        +id: string,
        +username: string,
      |},
    |},
  |}
|};
export type ChangeUsernameFormMutation = {|
  variables: ChangeUsernameFormMutationVariables,
  response: ChangeUsernameFormMutationResponse,
|};


/*
mutation ChangeUsernameFormMutation(
  $input: UpdateAccountUsernameAndRetainPreviousInput!
) {
  updateAccountUsernameAndRetainPrevious(input: $input) {
    validation
    accountUsername {
      id
      username
      account {
        id
        username
      }
    }
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
  "name": "validation",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/)
  ],
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
    "name": "ChangeUsernameFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateAccountUsernameAndRetainPreviousPayload",
        "kind": "LinkedField",
        "name": "updateAccountUsernameAndRetainPrevious",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountUsername",
            "kind": "LinkedField",
            "name": "accountUsername",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChangeUsernameFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateAccountUsernameAndRetainPreviousPayload",
        "kind": "LinkedField",
        "name": "updateAccountUsernameAndRetainPrevious",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountUsername",
            "kind": "LinkedField",
            "name": "accountUsername",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "appendNode",
                "key": "",
                "kind": "LinkedHandle",
                "name": "account",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  },
                  {
                    "kind": "Literal",
                    "name": "edgeTypeName",
                    "value": "UsernamesEdge"
                  }
                ]
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
    "id": "9a2b14d6b1fcc87a88391e8c8f9e7460",
    "metadata": {},
    "name": "ChangeUsernameFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'fc3aaf214c317098946216b82fdeab00';
module.exports = node;
