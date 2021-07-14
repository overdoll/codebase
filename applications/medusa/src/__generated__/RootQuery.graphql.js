/**
 * @flow
 * @relayHash 3d3673577f14370a1fc3e68435019568
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountLockReasonEnum = "PostInfraction" | "%future added value";
export type AccountRoleEnum = "Moderator" | "Staff" | "%future added value";
export type RootQueryVariables = {||};
export type RootQueryResponse = {|
  +authenticatedAccount: ?{|
    +username: string,
    +roles: $ReadOnlyArray<AccountRoleEnum>,
    +avatar: string,
    +lock: ?{|
      +reason: AccountLockReasonEnum,
      +expires: number,
    |},
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
    avatar
    lock {
      reason
      expires
    }
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "avatar",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountLock",
        "kind": "LinkedField",
        "name": "lock",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reason",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "expires",
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
    "id": "3d3673577f14370a1fc3e68435019568",
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'ec844176a30df1e28b1501779c6a030f';
module.exports = node;
