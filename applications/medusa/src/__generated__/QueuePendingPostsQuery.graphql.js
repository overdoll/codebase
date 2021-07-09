/**
 * @flow
 * @relayHash 483f02c6691e775f580985fa7dd3281a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type QueuePendingPostsQueryVariables = {||};
export type QueuePendingPostsQueryResponse = {|
  +pendingPosts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +contributor: {|
          +username: string,
          +avatar: string,
        |},
      |}
    |}>,
    +pageInfo: {|
      +startCursor: ?string,
      +endCursor: ?string,
      +hasNextPage: boolean,
      +hasPreviousPage: boolean,
    |},
  |}
|};
export type QueuePendingPostsQuery = {|
  variables: QueuePendingPostsQueryVariables,
  response: QueuePendingPostsQueryResponse,
|};


/*
query QueuePendingPostsQuery {
  pendingPosts(input: {first: 1}, filter: {}) {
    edges {
      node {
        id
        contributor {
          username
          avatar
        }
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "filter",
        "value": {}
      },
      {
        "kind": "Literal",
        "name": "input",
        "value": {
          "first": 1
        }
      }
    ],
    "concreteType": "PendingPostConnection",
    "kind": "LinkedField",
    "name": "pendingPosts",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PendingPostEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PendingPost",
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
                "concreteType": "Contributor",
                "kind": "LinkedField",
                "name": "contributor",
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
                    "name": "avatar",
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPreviousPage",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "pendingPosts(filter:{},input:{\"first\":1})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuePendingPostsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QueuePendingPostsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "483f02c6691e775f580985fa7dd3281a",
    "metadata": {},
    "name": "QueuePendingPostsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'af0b36c79857e192bb3d401733ff4049';
module.exports = node;
