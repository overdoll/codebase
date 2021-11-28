/**
 * @flow
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
    +updatedAccountEmail: ?{|
      +id: string,
      +status: AccountEmailStatus,
      +email: string,
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
    updatedAccountEmail {
      id
      status
      email
      account {
        emails {
          edges {
            node {
              id
              email
              status
            }
          }
        }
        id
      }
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
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountEmailConnection",
  "kind": "LinkedField",
  "name": "emails",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountEmailEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountEmail",
          "kind": "LinkedField",
          "name": "node",
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
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MakePrimaryOptionMutation",
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
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
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
    "name": "MakePrimaryOptionMutation",
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
    "cacheID": "f659b4b84cc3fe383250b407f5712c68",
    "id": null,
    "metadata": {},
    "name": "MakePrimaryOptionMutation",
    "operationKind": "mutation",
    "text": "mutation MakePrimaryOptionMutation(\n  $input: UpdateAccountEmailStatusToPrimaryInput!\n) {\n  updateAccountEmailStatusToPrimary(input: $input) {\n    updatedAccountEmail {\n      id\n      status\n      email\n      account {\n        emails {\n          edges {\n            node {\n              id\n              email\n              status\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '6e8235bf9bc1ff1afef069c5a4d84a69';
module.exports = node;
