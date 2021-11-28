/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { NavigationFragment$ref } from "./NavigationFragment.graphql";
export type AccountLockReason = "POST_INFRACTION" | "%future added value";
export type RootQueryVariables = {||};
export type RootQueryResponse = {|
  +viewer: ?{|
    +id: string,
    +isModerator: boolean,
    +isStaff: boolean,
    +lock: ?{|
      +reason: AccountLockReason,
      +expires: any,
    |},
    +$fragmentRefs: NavigationFragment$ref,
  |}
|};
export type RootQuery = {|
  variables: RootQueryVariables,
  response: RootQueryResponse,
|};


/*
query RootQuery {
  viewer {
    id
    ...NavigationFragment
    isModerator
    isStaff
    lock {
      reason
      expires
    }
  }
}

fragment AvatarMenuFragment on Account {
  avatar
}

fragment NavigationFragment on Account {
  ...AvatarMenuFragment
  ...ProfileButtonFragment
}

fragment ProfileButtonFragment on Account {
  username
  avatar
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isModerator",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isStaff",
  "storageKey": null
},
v3 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NavigationFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "855ae9c1fe7deaa2c3c9e312de23343b",
    "id": null,
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": "query RootQuery {\n  viewer {\n    id\n    ...NavigationFragment\n    isModerator\n    isStaff\n    lock {\n      reason\n      expires\n    }\n  }\n}\n\nfragment AvatarMenuFragment on Account {\n  avatar\n}\n\nfragment NavigationFragment on Account {\n  ...AvatarMenuFragment\n  ...ProfileButtonFragment\n}\n\nfragment ProfileButtonFragment on Account {\n  username\n  avatar\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '042a913a555a0211a5b396045227a1c5';
module.exports = node;
