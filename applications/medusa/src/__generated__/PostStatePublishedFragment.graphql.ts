/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStatePublishedFragment = {
    readonly publishedPosts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"PostStatePublishedPreviewFragment">;
            };
        }>;
    };
    readonly id: string;
    readonly " $refType": "PostStatePublishedFragment";
};
export type PostStatePublishedFragment$data = PostStatePublishedFragment;
export type PostStatePublishedFragment$key = {
    readonly " $data"?: PostStatePublishedFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStatePublishedFragment">;
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
      "operation": require('./PublishedPostsPaginationQuery.graphql.ts'),
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
  "type": "Club",
  "abstractKey": null
};
})();
(node as any).hash = '7a2cb38862b91600dddef820c973b1e9';
export default node;
