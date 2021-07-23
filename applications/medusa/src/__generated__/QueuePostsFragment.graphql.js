/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type PendingPostStateEnum = "Discarded" | "Published" | "Rejected" | "Review" | "%future added value";
import type { FragmentReference } from "relay-runtime";
import type { QueuePostsFragment$ref, QueuePostsFragment$fragmentType } from "./PostsPaginationQuery.graphql";
export type { QueuePostsFragment$ref, QueuePostsFragment$fragmentType };
export type QueuePostsFragment = {|
  +pendingPosts: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +state: PendingPostStateEnum,
        +contributor: {|
          +username: string,
          +avatar: string,
        |},
        +content: $ReadOnlyArray<string>,
        +categories: $ReadOnlyArray<{|
          +title: string
        |}>,
        +characters: $ReadOnlyArray<{|
          +name: string,
          +media: {|
            +title: string
          |},
        |}>,
        +mediaRequests: ?$ReadOnlyArray<string>,
        +characterRequests: ?$ReadOnlyArray<{|
          +name: string,
          +media: string,
        |}>,
        +artistId: ?string,
        +artistUsername: string,
        +postedAt: any,
        +reassignmentAt: any,
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
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
                  "name": "state",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "content",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Category",
                  "kind": "LinkedField",
                  "name": "categories",
                  "plural": true,
                  "selections": (v1/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Character",
                  "kind": "LinkedField",
                  "name": "characters",
                  "plural": true,
                  "selections": [
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Media",
                      "kind": "LinkedField",
                      "name": "media",
                      "plural": false,
                      "selections": (v1/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mediaRequests",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CharacterRequestType",
                  "kind": "LinkedField",
                  "name": "characterRequests",
                  "plural": true,
                  "selections": [
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "media",
                      "storageKey": null
                    }
                  ],
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
                  "name": "artistUsername",
                  "storageKey": null
                },
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
                  "name": "reassignmentAt",
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
(node: any).hash = '219172e15ff10b97e7d102591823a425';
module.exports = node;
