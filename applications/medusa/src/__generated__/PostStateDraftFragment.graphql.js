/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostStateDraftPreviewFragment$ref } from "./PostStateDraftPreviewFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { PostStateDraftFragment$ref, PostStateDraftFragment$fragmentType } from "./DraftPostsPaginationQuery.graphql";
export type { PostStateDraftFragment$ref, PostStateDraftFragment$fragmentType };
export type PostStateDraftFragment = {|
  +draftPosts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +$fragmentRefs: PostStateDraftPreviewFragment$ref
      |}
    |}>
  |},
  +id: string,
  +$refType: PostStateDraftFragment$ref,
|};
export type PostStateDraftFragment$data = PostStateDraftFragment;
export type PostStateDraftFragment$key = {
  +$data?: PostStateDraftFragment$data,
  +$fragmentRefs: PostStateDraftFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "draftPosts"
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
      "operation": require('./DraftPostsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "PostStateDraftFragment",
  "selections": [
    {
      "alias": "draftPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "state",
          "value": "DRAFT"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__DraftPostsPaginationQuery_draftPosts_connection",
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
                  "name": "PostStateDraftPreviewFragment"
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
      "storageKey": "__DraftPostsPaginationQuery_draftPosts_connection(state:\"DRAFT\")"
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
(node: any).hash = '0963bc9d66dc0f15483eedd686e24359';
module.exports = node;
