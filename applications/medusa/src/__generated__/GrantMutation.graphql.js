/**
 * @flow
 * @relayHash cfe0d94d863688cde25eb44bfee758c1
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantMutationVariables = {||};
export type GrantMutationResponse = {|
  +grantAccountAccessWithAuthenticationToken: ?{|
    +account: ?{|
      +username: string
    |}
  |}
|};
export type GrantMutation = {|
  variables: GrantMutationVariables,
  response: GrantMutationResponse,
|};


/*
mutation GrantMutation {
  grantAccountAccessWithAuthenticationToken {
    account {
      username
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GrantMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GrantAccountAccessWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v0/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GrantMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GrantAccountAccessWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
    "id": "cfe0d94d863688cde25eb44bfee758c1",
    "metadata": {},
    "name": "GrantMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '716ba5e54678340cf13a717bf5711f33';
module.exports = node;
