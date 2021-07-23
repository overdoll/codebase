/**
 * @flow
 * @relayHash c404ab6cc682a6a581c7ce0d003e22b5
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RootComponent_account$ref: FragmentReference;
declare export opaque type RootComponent_account$fragmentType: RootComponent_account$ref;
export type RootAccountRefreshQueryVariables = {||};
export type RootAccountRefreshQueryResponse = {|
  +$fragmentRefs: RootComponent_account$ref
|};
export type RootAccountRefreshQuery = {|
  variables: RootAccountRefreshQueryVariables,
  response: RootAccountRefreshQueryResponse,
|};


/*
query RootAccountRefreshQuery {
  ...RootComponent_account
}

fragment RootComponent_account on Query {
  viewer {
    username
    isStaff
    isArtist
    isModerator
    avatar
    lock {
      reason
      expires
    }
    id
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootAccountRefreshQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "RootComponent_account"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootAccountRefreshQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
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
            "name": "isStaff",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isArtist",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isModerator",
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
          },
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
    "id": "c404ab6cc682a6a581c7ce0d003e22b5",
    "metadata": {},
    "name": "RootAccountRefreshQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = '0dfb3e06e95cac865f3fcb93a5811d1c';
module.exports = node;
