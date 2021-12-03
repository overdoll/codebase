/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { DraftPostPreviewFragment$ref } from "./DraftPostPreviewFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { OpenDraftPostsFragment$ref, OpenDraftPostsFragment$fragmentType } from "./OpenDraftPostsPaginationQuery.graphql";
export type { OpenDraftPostsFragment$ref, OpenDraftPostsFragment$fragmentType };
export type OpenDraftPostsFragment = {|
  +posts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +$fragmentRefs: DraftPostPreviewFragment$ref
      |}
    |}>
  |},
  +id: string,
  +$refType: OpenDraftPostsFragment$ref,
|};
export type OpenDraftPostsFragment$data = OpenDraftPostsFragment;
export type OpenDraftPostsFragment$key = {
  +$data?: OpenDraftPostsFragment$data,
  +$fragmentRefs: OpenDraftPostsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "posts"
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
      "operation": require('./OpenDraftPostsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "OpenDraftPostsFragment",
  "selections": [
    {
      "alias": "posts",
      "args": null,
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__OpenDraftPostsPaginationQuery_posts_connection",
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
                  "name": "DraftPostPreviewFragment"
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
(node: any).hash = '00fee834db021405a51ba403546b964a';
module.exports = node;
