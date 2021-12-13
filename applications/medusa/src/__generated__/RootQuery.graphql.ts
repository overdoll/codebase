/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 0adbc04134718f7c3ac1e7acd83acb03 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountLockReason = "POST_INFRACTION" | "%future added value";
export type RootQueryVariables = {};
export type RootQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly isModerator: boolean;
        readonly isStaff: boolean;
        readonly lock: {
            readonly reason: AccountLockReason;
            readonly expires: unknown;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"NavigationFragment">;
    } | null;
};
export type RootQuery = {
    readonly response: RootQueryResponse;
    readonly variables: RootQueryVariables;
};



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

fragment NavigationFragment on Account {
  ...SimpleProfileButtonFragment
  ...ProfileButtonFragment
}

fragment ProfileButtonFragment on Account {
  username
  avatar
}

fragment SimpleProfileButtonFragment on Account {
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
    "id": "0adbc04134718f7c3ac1e7acd83acb03",
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '042a913a555a0211a5b396045227a1c5';
export default node;
