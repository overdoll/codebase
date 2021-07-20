/**
 * @flow
 * @relayHash 5d1adf5588e35e94786070bd9484079a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { QueuePostsFragment$ref } from "./QueuePostsFragment.graphql";
export type QueuePostsQueryVariables = {||};
export type QueuePostsQueryResponse = {|
  +$fragmentRefs: QueuePostsFragment$ref
|};
export type QueuePostsQuery = {|
  variables: QueuePostsQueryVariables,
  response: QueuePostsQueryResponse,
|};


/*
query QueuePostsQuery {
  ...QueuePostsFragment
}

fragment QueuePostsFragment on Query {
  pendingPosts(first: 1) {
    edges {
      node {
        id
        artistId
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueuePostsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "QueuePostsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QueuePostsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "artistId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
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
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "pendingPosts(first:1)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "QueuePostsFragment_pendingPosts",
        "kind": "LinkedHandle",
        "name": "pendingPosts"
      }
    ]
  },
  "params": {
    "id": "5d1adf5588e35e94786070bd9484079a",
    "metadata": {},
    "name": "QueuePostsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '667c52ca593f7c6abc80fa83aea79429';
module.exports = node;
