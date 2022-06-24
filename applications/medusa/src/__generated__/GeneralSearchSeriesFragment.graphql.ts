/**
 * @generated SignedSource<<a79268f63cc5a4e4bfab868886af5674>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneralSearchSeriesFragment$data = {
  readonly series: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly slug: string;
        readonly title: string;
        readonly " $fragmentSpreads": FragmentRefs<"SeriesTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "GeneralSearchSeriesFragment";
};
export type GeneralSearchSeriesFragment$key = {
  readonly " $data"?: GeneralSearchSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneralSearchSeriesFragment">;
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
      "defaultValue": 5,
      "kind": "LocalArgument",
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
      "operation": require('./GeneralSearchSeriesPaginationFragment.graphql')
    }
  },
  "name": "GeneralSearchSeriesFragment",
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
      "name": "__GeneralSearchSeries_series_connection",
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

(node as any).hash = "aff39ef731c62f8c12d1e2f33db160b8";

export default node;
