/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type PostState = "Discarded" | "Discarding" | "Draft" | "Processing" | "Published" | "Publishing" | "Rejected" | "Removed" | "Removing" | "Review" | "%future added value";
import type { FragmentReference } from "relay-runtime";
import type { DraftPostsFragment$ref, DraftPostsFragment$fragmentType } from "./DraftPostsPaginationQuery.graphql";
export type { DraftPostsFragment$ref, DraftPostsFragment$fragmentType };
export type DraftPostsFragment = {|
  +posts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +state: PostState,
      |}
    |}>
  |},
  +id: string,
  +$refType: DraftPostsFragment$ref,
|};
export type DraftPostsFragment$data = DraftPostsFragment;
export type DraftPostsFragment$key = {
  +$data?: DraftPostsFragment$data,
  +$fragmentRefs: DraftPostsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "posts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 4,
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./DraftPostsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "DraftPostsFragment",
  "selections": [
    {
      "alias": "posts",
      "args": null,
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__DraftPostsPaginationQuery_posts_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "state",
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
    },
    (v1/*: any*/)
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '193163415c042e2d98cb44d3edafdcdf';
module.exports = node;
