/**
 * @flow
 * @relayHash 3434ef0a82b3c2c17362082d1c1495a3
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountRoleEnum = "Moderator" | "Staff" | "%future added value";
export type RootQueryVariables = {||};
export type RootQueryResponse = {|
  +authenticatedAccount: ?{|
    +username: string,
    +roles: $ReadOnlyArray<AccountRoleEnum>,
  |}
|};
export type RootQuery = {|
  variables: RootQueryVariables,
  response: RootQueryResponse,
|};


/*
query RootQuery {
  authenticatedAccount {
    username
    roles
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "authenticatedAccount",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "roles",
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
    "name": "RootQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "3434ef0a82b3c2c17362082d1c1495a3",
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'fa4aade3eb3645aa574120e47d24c973';
module.exports = node;
