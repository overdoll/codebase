/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStateDraftFragment = {
    readonly draftPosts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": FragmentRefs<"PostStateDraftPreviewFragment">;
            };
        }>;
    };
    readonly id: string;
    readonly " $refType": "PostStateDraftFragment";
};
export type PostStateDraftFragment$data = PostStateDraftFragment;
export type PostStateDraftFragment$key = {
    readonly " $data"?: PostStateDraftFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStateDraftFragment">;
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
      "operation": require('./DraftPostsPaginationQuery.graphql.ts'),
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
(node as any).hash = '0963bc9d66dc0f15483eedd686e24359';
export default node;
