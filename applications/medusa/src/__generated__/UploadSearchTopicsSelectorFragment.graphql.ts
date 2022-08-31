/**
 * @generated SignedSource<<bc99909089a3b98b3c24f81b0e581631>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadSearchTopicsSelectorFragment$data = {
  readonly topics: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"TopicTileOverlayFragment" | "UploadSearchTopicCategoriesFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "UploadSearchTopicsSelectorFragment";
};
export type UploadSearchTopicsSelectorFragment$key = {
  readonly " $data"?: UploadSearchTopicsSelectorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadSearchTopicsSelectorFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "topics"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 100,
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
      "operation": require('./UploadSearchTopicsSelectorFragmentPaginationFragment.graphql')
    }
  },
  "name": "UploadSearchTopicsSelectorFragment",
  "selections": [
    {
      "alias": "topics",
      "args": null,
      "concreteType": "TopicConnection",
      "kind": "LinkedField",
      "name": "__UploadSearchTopicsSelectorFragment_topics_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TopicEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Topic",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TopicTileOverlayFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "UploadSearchTopicCategoriesFragment"
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

(node as any).hash = "a3c56e9865fd57c2d0c74db9cd388039";

export default node;
