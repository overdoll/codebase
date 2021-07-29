/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ModeratePostFragment$ref } from "./ModeratePostFragment.graphql";
import type { NoPostsPlaceholderFragment$ref } from "./NoPostsPlaceholderFragment.graphql";
import type { PostArtistFragment$ref } from "./PostArtistFragment.graphql";
import type { PostCategoriesFragment$ref } from "./PostCategoriesFragment.graphql";
import type { PostCharactersFragment$ref } from "./PostCharactersFragment.graphql";
import type { PostContentFragment$ref } from "./PostContentFragment.graphql";
import type { PostHeaderFragment$ref } from "./PostHeaderFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { PendingPostsFragment$ref, PendingPostsFragment$fragmentType } from "./PostsPaginationQuery.graphql";
export type { PendingPostsFragment$ref, PendingPostsFragment$fragmentType };
export type PendingPostsFragment = {|
  +moderatorPostsQueue: {|
    +__id: string,
    +edges: $ReadOnlyArray<{|
      +node: {|
        +postedAt: any,
        +$fragmentRefs: PostHeaderFragment$ref & PostContentFragment$ref & PostArtistFragment$ref & PostCharactersFragment$ref & PostCategoriesFragment$ref & ModeratePostFragment$ref,
      |}
    |}>,
  |},
  +id: string,
  +$fragmentRefs: NoPostsPlaceholderFragment$ref,
  +$refType: PendingPostsFragment$ref,
|};
export type PendingPostsFragment$data = PendingPostsFragment;
export type PendingPostsFragment$key = {
  +$data?: PendingPostsFragment$data,
  +$fragmentRefs: PendingPostsFragment$ref,
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
  "name": "PendingPostsFragment",
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
                  "name": "PostContentFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostArtistFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostCharactersFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostCategoriesFragment"
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
(node: any).hash = 'd7f8b0daa97e82c93df1a423c1f82ca1';
module.exports = node;
