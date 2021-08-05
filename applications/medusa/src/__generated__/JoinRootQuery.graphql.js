/**
 * @flow
 * @relayHash e4ed5f18e4c0f13b0c5a5cbc4e02fa4c
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { JoinFragment$ref } from "./JoinFragment.graphql";
import type { JoinRootFragment$ref } from "./JoinRootFragment.graphql";
import type { LobbyFragment$ref } from "./LobbyFragment.graphql";
export type JoinRootQueryVariables = {||};
export type JoinRootQueryResponse = {|
  +viewAuthenticationToken: ?{|
    +$fragmentRefs: LobbyFragment$ref & JoinRootFragment$ref & JoinFragment$ref
  |}
|};
export type JoinRootQuery = {|
  variables: JoinRootQueryVariables,
  response: JoinRootQueryResponse,
|};


/*
query JoinRootQuery {
  viewAuthenticationToken {
    ...LobbyFragment
    ...JoinRootFragment
    ...JoinFragment
    id
  }
}

fragment JoinFragment on AuthenticationToken {
  email
}

fragment JoinRootFragment on AuthenticationToken {
  verified
  sameSession
  accountStatus {
    registered
  }
}

fragment LobbyFragment on AuthenticationToken {
  email
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LobbyFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinRootFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinFragment"
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
    "name": "JoinRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
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
            "name": "verified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sameSession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "registered",
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
    "id": "e4ed5f18e4c0f13b0c5a5cbc4e02fa4c",
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": null
  }
};
// prettier-ignore
(node: any).hash = 'bfb99643cfaca3b38b1c778fcaeaf828';
module.exports = node;
