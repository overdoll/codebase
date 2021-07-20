/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
import type { QueuePostsFragment$ref, QueuePostsFragment$fragmentType } from "./PostsPaginationQuery.graphql";
export type { QueuePostsFragment$ref, QueuePostsFragment$fragmentType };
export type QueuePostsFragment = {|
  +pendingPosts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +artistId: ?string,
      |}
    |}>
  |},
  +$refType: QueuePostsFragment$ref,
|};
export type QueuePostsFragment$data = QueuePostsFragment;
export type QueuePostsFragment$key = {
  +$data?: QueuePostsFragment$data,
  +$fragmentRefs: QueuePostsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "pendingPosts"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./PostsPaginationQuery.graphql.js')
    }
  },
  "name": "QueuePostsFragment",
  "selections": [
    {
      "alias": "pendingPosts",
      "args": null,
      "concreteType": "PendingPostConnection",
      "kind": "LinkedField",
      "name": "__QueuePostsFragment_pendingPosts_connection",
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '29677cc01ccab58b9172aa2182b478f3';
module.exports = node;
