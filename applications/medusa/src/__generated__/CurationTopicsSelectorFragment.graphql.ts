/**
 * @generated SignedSource<<f5127dbf1527871f9b549cd8912cd6a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationTopicsSelectorFragment$data = {
  readonly topics: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"CurationTopicCategoriesFragment" | "TopicTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "CurationTopicsSelectorFragment";
};
export type CurationTopicsSelectorFragment$key = {
  readonly " $data"?: CurationTopicsSelectorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationTopicsSelectorFragment">;
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
      "operation": require('./CurationTopicsSelectorFragmentPaginationFragment.graphql')
    }
  },
  "name": "CurationTopicsSelectorFragment",
  "selections": [
    {
      "alias": "topics",
      "args": null,
      "concreteType": "TopicConnection",
      "kind": "LinkedField",
      "name": "__CurationTopicsSelectorFragment_topics_connection",
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
                  "name": "CurationTopicCategoriesFragment"
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

(node as any).hash = "ef5cc801eb9b3479e1f2c82d7e8f40f3";

export default node;
