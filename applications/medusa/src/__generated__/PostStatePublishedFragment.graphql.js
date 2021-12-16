/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostStatePublishedPreviewFragment$ref } from "./PostStatePublishedPreviewFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { PostStatePublishedFragment$ref, PostStatePublishedFragment$fragmentType } from "./PublishedPostsPaginationQuery.graphql";
export type { PostStatePublishedFragment$ref, PostStatePublishedFragment$fragmentType };
export type PostStatePublishedFragment = {|
  +publishedPosts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +$fragmentRefs: PostStatePublishedPreviewFragment$ref
      |}
    |}>
  |},
  +id: string,
  +$refType: PostStatePublishedFragment$ref,
|};
export type PostStatePublishedFragment$data = PostStatePublishedFragment;
export type PostStatePublishedFragment$key = {
  +$data?: PostStatePublishedFragment$data,
  +$fragmentRefs: PostStatePublishedFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "publishedPosts"
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
      "operation": require('./PublishedPostsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "PostStatePublishedFragment",
  "selections": [
    {
      "alias": "publishedPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "state",
          "value": "PUBLISHED"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__PublishedPostsPaginationQuery_publishedPosts_connection",
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
                  "name": "PostStatePublishedPreviewFragment"
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
      "storageKey": "__PublishedPostsPaginationQuery_publishedPosts_connection(state:\"PUBLISHED\")"
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
(node: any).hash = 'f6d6b10ada5bbf89118eb4a7abf1520b';
module.exports = node;
