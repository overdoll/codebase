/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ModeratePostFragment$ref } from "./ModeratePostFragment.graphql";
import type { NoPostsPlaceholderFragment$ref } from "./NoPostsPlaceholderFragment.graphql";
import type { PostHeaderFragment$ref } from "./PostHeaderFragment.graphql";
import type { PostPreviewFragment$ref } from "./PostPreviewFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { PostsFragment$ref, PostsFragment$fragmentType } from "./PostsPaginationQuery.graphql";
export type { PostsFragment$ref, PostsFragment$fragmentType };
export type PostsFragment = {|
  +moderatorPostsQueue: {|
    +__id: string,
    +edges: $ReadOnlyArray<{|
      +node: {|
        +postedAt: any,
        +$fragmentRefs: PostHeaderFragment$ref & PostPreviewFragment$ref & ModeratePostFragment$ref,
      |}
    |}>,
  |},
  +id: string,
  +$fragmentRefs: NoPostsPlaceholderFragment$ref,
  +$refType: PostsFragment$ref,
|};
export type PostsFragment$data = PostsFragment;
export type PostsFragment$key = {
  +$data?: PostsFragment$data,
  +$fragmentRefs: PostsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "moderatorPostsQueue"
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./PostsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "PostsFragment",
  "selections": [
    {
      "alias": "moderatorPostsQueue",
      "args": null,
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__Posts_moderatorPostsQueue_connection",
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
                  "name": "postedAt",
                  "storageKey": null
                },
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
                  "name": "PostHeaderFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostPreviewFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ModeratePostFragment"
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
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NoPostsPlaceholderFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '76682a7111f9934a66d06957a57f3b23';
module.exports = node;
