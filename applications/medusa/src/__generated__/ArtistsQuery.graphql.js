/**
 * @flow
 * @relayHash e9e3efa5540f9a88df3e8d32bb0988ee
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ArtistsQueryVariables = {|
  username: string
|};
export type ArtistsQueryResponse = {|
  +accounts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +avatar: any,
        +username: string,
      |}
    |}>
  |}
|};
export type ArtistsQuery = {|
  variables: ArtistsQueryVariables,
  response: ArtistsQueryResponse,
|};


/*
query ArtistsQuery(
  $username: String!
) {
  accounts(username: $username) {
    edges {
      node {
        id
        avatar
        username
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "AccountConnection",
    "kind": "LinkedField",
    "name": "accounts",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              }
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtistsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "e9e3efa5540f9a88df3e8d32bb0988ee",
    "metadata": {},
    "name": "ArtistsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'ae118c9596025f4b22c02d92a65c3ec4';
module.exports = node;
