/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 911d0f87e5703cfc431258d638ab4ba9 */

import { ConcreteRequest } from "relay-runtime";
export type AccountLockReason = "POST_INFRACTION" | "%future added value";
export type LockedQueryVariables = {};
export type LockedQueryResponse = {
    readonly viewer: {
        readonly avatar: unknown;
        readonly lock: {
            readonly reason: AccountLockReason;
            readonly expires: unknown;
        } | null;
    } | null;
};
export type LockedQuery = {
    readonly response: LockedQueryResponse;
    readonly variables: LockedQueryVariables;
};



/*
query LockedQuery {
  viewer {
    avatar
    lock {
      reason
      expires
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v1 = {
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
    "name": "LockedQuery",
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
          (v1/*: any*/)
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
    "name": "LockedQuery",
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
    ]
  },
  "params": {
    "id": "911d0f87e5703cfc431258d638ab4ba9",
    "metadata": {},
    "name": "LockedQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'fa92eaf5031d3e2d902cba030dc75187';
export default node;
