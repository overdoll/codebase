/**
 * @flow
<<<<<<< HEAD
 * @relayHash 06a6bef9081d887fba03239a6c25e315
=======
 * @relayHash f659b4b84cc3fe383250b407f5712c68
>>>>>>> master
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type UpdateAccountEmailStatusToPrimaryInput = {|
  accountEmailId: string
|};
export type MakePrimaryOptionMutationVariables = {|
  input: UpdateAccountEmailStatusToPrimaryInput
|};
export type MakePrimaryOptionMutationResponse = {|
  +updateAccountEmailStatusToPrimary: ?{|
<<<<<<< HEAD
    +primaryAccountEmail: ?{|
=======
    +updatedAccountEmail: ?{|
>>>>>>> master
      +id: string,
      +email: string,
      +status: AccountEmailStatus,
    |},
    +updatedAccountEmail: ?{|
      +id: string,
      +email: string,
<<<<<<< HEAD
      +status: AccountEmailStatus,
    |},
=======
      +account: ?{|
        +emails: {|
          +edges: $ReadOnlyArray<{|
            +node: {|
              +id: string,
              +email: string,
              +status: AccountEmailStatus,
            |}
          |}>
        |}
      |},
    |}
>>>>>>> master
  |}
|};
export type MakePrimaryOptionMutation = {|
  variables: MakePrimaryOptionMutationVariables,
  response: MakePrimaryOptionMutationResponse,
|};


/*
mutation MakePrimaryOptionMutation(
  $input: UpdateAccountEmailStatusToPrimaryInput!
) {
  updateAccountEmailStatusToPrimary(input: $input) {
<<<<<<< HEAD
    primaryAccountEmail {
=======
    updatedAccountEmail {
>>>>>>> master
      id
      email
      status
    }
    updatedAccountEmail {
      id
      email
      status
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateAccountEmailStatusToPrimaryPayload",
    "kind": "LinkedField",
    "name": "updateAccountEmailStatusToPrimary",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEmail",
        "kind": "LinkedField",
        "name": "primaryAccountEmail",
        "plural": false,
<<<<<<< HEAD
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEmail",
        "kind": "LinkedField",
        "name": "updatedAccountEmail",
        "plural": false,
        "selections": (v1/*: any*/),
=======
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEmail",
            "kind": "LinkedField",
            "name": "updatedAccountEmail",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "account",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
>>>>>>> master
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
    "name": "MakePrimaryOptionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MakePrimaryOptionMutation",
<<<<<<< HEAD
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "06a6bef9081d887fba03239a6c25e315",
=======
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAccountEmailStatusToPrimaryPayload",
        "kind": "LinkedField",
        "name": "updateAccountEmailStatusToPrimary",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEmail",
            "kind": "LinkedField",
            "name": "updatedAccountEmail",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "account",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v2/*: any*/)
                ],
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
    "id": "f659b4b84cc3fe383250b407f5712c68",
>>>>>>> master
    "metadata": {},
    "name": "MakePrimaryOptionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
<<<<<<< HEAD
(node: any).hash = '327834a60836a375a6732b56496bcd46';
=======
(node: any).hash = '6e8235bf9bc1ff1afef069c5a4d84a69';
>>>>>>> master
module.exports = node;
