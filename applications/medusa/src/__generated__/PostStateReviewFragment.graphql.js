/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostStateReviewPreviewFragment$ref } from "./PostStateReviewPreviewFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { PostStateReviewFragment$ref, PostStateReviewFragment$fragmentType } from "./ReviewPostsPaginationQuery.graphql";
export type { PostStateReviewFragment$ref, PostStateReviewFragment$fragmentType };
export type PostStateReviewFragment = {|
  +reviewPosts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +$fragmentRefs: PostStateReviewPreviewFragment$ref
      |}
    |}>
  |},
  +id: string,
  +$refType: PostStateReviewFragment$ref,
|};
export type PostStateReviewFragment$data = PostStateReviewFragment;
export type PostStateReviewFragment$key = {
  +$data?: PostStateReviewFragment$data,
  +$fragmentRefs: PostStateReviewFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "reviewPosts"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 3,
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
      "operation": require('./ReviewPostsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "PostStateReviewFragment",
  "selections": [
    {
      "alias": "reviewPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "state",
          "value": "REVIEW"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ReviewPostsPaginationQuery_reviewPosts_connection",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostStateReviewPreviewFragment"
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
      "storageKey": "__ReviewPostsPaginationQuery_reviewPosts_connection(state:\"REVIEW\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '5d8e4692f626f8476dadb2e7fa0aa69d';
module.exports = node;
