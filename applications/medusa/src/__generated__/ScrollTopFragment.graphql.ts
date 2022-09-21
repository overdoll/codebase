/**
 * @generated SignedSource<<702ef84d278b7301962f8c3a7daee2f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollTopFragment$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PreviewPostFragment">;
      };
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"VerticalPaginationScrollerFragment">;
  };
  readonly " $fragmentType": "ScrollTopFragment";
};
export type ScrollTopFragment$key = {
  readonly " $data"?: ScrollTopFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollTopFragment">;
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
      "defaultValue": 5,
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
      "operation": require('./TopPostsPaginationQuery.graphql')
    }
  },
  "name": "ScrollTopFragment",
  "selections": [
    {
      "alias": "posts",
      "args": [
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "TOP"
        },
        {
          "kind": "Literal",
          "name": "state",
          "value": "PUBLISHED"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__TopPosts_posts_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PreviewPostFragment"
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "VerticalPaginationScrollerFragment"
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
      "storageKey": "__TopPosts_posts_connection(sortBy:\"TOP\",state:\"PUBLISHED\")"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "9438a9df3f10cfa15a394225e0e6f0d9";

export default node;
