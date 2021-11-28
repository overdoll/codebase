/**
 * @flow
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
    multiFactor {
      totp
    }
    ...MultiFactorFragment
  }
}

fragment LobbyFragment on AuthenticationToken {
  email
}

fragment MultiFactorFragment on AuthenticationTokenAccountStatus {
  multiFactor {
    totp
  }
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
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MultiFactor",
                "kind": "LinkedField",
                "name": "multiFactor",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totp",
                    "storageKey": null
                  }
                ],
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
    "cacheID": "8e30dfd46ad67a5e8620e1341c669528",
    "id": null,
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": "query JoinRootQuery {\n  viewAuthenticationToken {\n    ...LobbyFragment\n    ...JoinRootFragment\n    ...JoinFragment\n    id\n  }\n}\n\nfragment JoinFragment on AuthenticationToken {\n  email\n}\n\nfragment JoinRootFragment on AuthenticationToken {\n  verified\n  sameSession\n  accountStatus {\n    registered\n    multiFactor {\n      totp\n    }\n    ...MultiFactorFragment\n  }\n}\n\nfragment LobbyFragment on AuthenticationToken {\n  email\n}\n\nfragment MultiFactorFragment on AuthenticationTokenAccountStatus {\n  multiFactor {\n    totp\n  }\n}\n"
  }
};
// prettier-ignore
(node: any).hash = 'bfb99643cfaca3b38b1c778fcaeaf828';
module.exports = node;
