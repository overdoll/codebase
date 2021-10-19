/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
import type { ViewerDraftPostsFragment$ref, ViewerDraftPostsFragment$fragmentType } from "./DraftPostsQueryQuery.graphql";
export type { ViewerDraftPostsFragment$ref, ViewerDraftPostsFragment$fragmentType };
export type ViewerDraftPostsFragment = {|
  +contributions: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string
      |}
    |}>
  |},
  +id: string,
  +$refType: ViewerDraftPostsFragment$ref,
|};
export type ViewerDraftPostsFragment$data = ViewerDraftPostsFragment;
export type ViewerDraftPostsFragment$key = {
  +$data?: ViewerDraftPostsFragment$data,
  +$fragmentRefs: ViewerDraftPostsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "contributions"
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
      "operation": require('./DraftPostsQueryQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "ViewerDraftPostsFragment",
  "selections": [
    {
      "alias": "contributions",
      "args": null,
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__contributions_contributions_connection",
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
(node: any).hash = '37dde74df5a8d3c9b9916dcc435ec1b1';
module.exports = node;
