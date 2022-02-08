/**
 * @generated SignedSource<<c9ec8d57c6d07bdf3c260f4dcb92d735>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchSeriesGeneralFragment$data = {
  readonly series: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"SeriesTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "SearchSeriesGeneralFragment";
};
export type SearchSeriesGeneralFragment = SearchSeriesGeneralFragment$data;
export type SearchSeriesGeneralFragment$key = {
  readonly " $data"?: SearchSeriesGeneralFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchSeriesGeneralFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "series"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "search"
    },
    {
      "kind": "RootArgument",
      "name": "seriesSlugs"
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
      "operation": require('./SearchSeriesGeneralPaginationFragment.graphql')
    }
  },
  "name": "SearchSeriesGeneralFragment",
  "selections": [
    {
      "alias": "series",
      "args": [
        {
          "kind": "Variable",
          "name": "slugs",
          "variableName": "seriesSlugs"
        },
        {
          "kind": "Variable",
          "name": "title",
          "variableName": "search"
        }
      ],
      "concreteType": "SeriesConnection",
      "kind": "LinkedField",
      "name": "__SearchSeriesGeneral_series_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SeriesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Series",
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
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SeriesTileOverlayFragment"
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

(node as any).hash = "558b0568151a8c624723cfff8e6d451d";

export default node;
