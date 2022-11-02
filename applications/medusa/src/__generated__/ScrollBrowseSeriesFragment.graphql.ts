/**
 * @generated SignedSource<<73014b4eac48d612cf7ce440196d73e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollBrowseSeriesFragment$data = {
  readonly series: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsSeriesFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ScrollBrowseSeriesFragment";
};
export type ScrollBrowseSeriesFragment$key = {
  readonly " $data"?: ScrollBrowseSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseSeriesFragment">;
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
      "defaultValue": 24,
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
      "operation": require('./ScrollBrowseSeriesPaginationQuery.graphql')
    }
  },
  "name": "ScrollBrowseSeriesFragment",
  "selections": [
    {
      "alias": "series",
      "args": [
        {
          "kind": "Literal",
          "name": "excludeEmpty",
          "value": true
        }
      ],
      "concreteType": "SeriesConnection",
      "kind": "LinkedField",
      "name": "__ScrollBrowseSeries_series_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SearchResultsSeriesFragment"
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
      "storageKey": "__ScrollBrowseSeries_series_connection(excludeEmpty:true)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "71fa15ee9367400df0559a7a2029d831";

export default node;
