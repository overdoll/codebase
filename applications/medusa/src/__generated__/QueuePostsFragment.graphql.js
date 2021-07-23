/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type PostState = "Discarded" | "Discarding" | "Processing" | "Published" | "Publishing" | "Rejected" | "Review" | "%future added value";
import type { FragmentReference } from "relay-runtime";
import type { QueuePostsFragment$ref, QueuePostsFragment$fragmentType } from "./PostsPaginationQuery.graphql";
export type { QueuePostsFragment$ref, QueuePostsFragment$fragmentType };
export type QueuePostsFragment = {|
  +moderatorPostsQueue: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +state: PostState,
        +contributor: {|
          +username: string,
          +avatar: any,
        |},
        +content: $ReadOnlyArray<{|
          +url: any
        |}>,
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
        +postedAt: any,
        +reassignmentAt: any,
      |}
    |}>
  |},
  +id: string,
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
  "moderatorPostsQueue"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
],
v3 = {
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./PostsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "QueuePostsFragment",
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
                  "concreteType": "Account",
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
                  "concreteType": "Content",
                  "kind": "LinkedField",
                  "name": "content",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Category",
                  "kind": "LinkedField",
                  "name": "categories",
                  "plural": true,
                  "selections": (v2/*: any*/),
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
                    (v3/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Media",
                      "kind": "LinkedField",
                      "name": "media",
                      "plural": false,
                      "selections": (v2/*: any*/),
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
                    (v3/*: any*/),
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
    },
    (v1/*: any*/)
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '4c7eb9a1cda0163e4b4fa72a81d3b3d5';
module.exports = node;
