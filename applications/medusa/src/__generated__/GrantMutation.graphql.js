/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenValidation = "TOKEN_EXPIRED" | "%future added value";
export type GrantMutationVariables = {||};
export type GrantMutationResponse = {|
  +grantAccountAccessWithAuthenticationToken: ?{|
    +validation: ?GrantAccountAccessWithAuthenticationTokenValidation,
    +account: ?{|
      +id: string
    |},
  |}
|};
export type GrantMutation = {|
  variables: GrantMutationVariables,
  response: GrantMutationResponse,
|};


/*
mutation GrantMutation {
  grantAccountAccessWithAuthenticationToken {
    validation
    account {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "kind": "ScalarField",
        "name": "validation",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GrantMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GrantMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "df1bb1c0b3d007aa2174bed8b2352bea",
    "id": null,
    "metadata": {},
    "name": "GrantMutation",
    "operationKind": "mutation",
    "text": "mutation GrantMutation {\n  grantAccountAccessWithAuthenticationToken {\n    validation\n    account {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5fed83d99a5ead7514e405a9fb5f21da';
module.exports = node;
