/**
 * @flow
 * @relayHash 4cbb1cbf17c57335accfd532ad6b8431
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
    +id: string,
    +$fragmentRefs: LobbyFragment$ref & JoinRootFragment$ref & JoinFragment$ref,
  |}
|};
export type JoinRootQuery = {|
  variables: JoinRootQueryVariables,
  response: JoinRootQueryResponse,
|};


/*
query JoinRootQuery {
  viewAuthenticationToken {
    id
    ...LobbyFragment
    ...JoinRootFragment
    ...JoinFragment
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

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
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
          (v0/*: any*/),
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
          (v0/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4cbb1cbf17c57335accfd532ad6b8431",
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '0c6c0b6a163273018d9e42ae3cceaaa3';
module.exports = node;
