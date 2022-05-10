/**
 * @generated SignedSource<<873e10c2f7efc23c69577570d5324fc5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubTransactionMetricsFragment$data = {
  readonly transactionMetrics: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly currency: Currency;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubTransactionMetricsFragment";
};
export type ClubTransactionMetricsFragment = ClubTransactionMetricsFragment$data;
export type ClubTransactionMetricsFragment$key = {
  readonly " $data"?: ClubTransactionMetricsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubTransactionMetricsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "transactionMetrics"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 2,
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
      "operation": require('./ClubTransactionMetricsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubTransactionMetricsFragment",
  "selections": [
    {
      "alias": "transactionMetrics",
      "args": null,
      "concreteType": "ClubTransactionMetricConnection",
      "kind": "LinkedField",
      "name": "__ClubTransactionMetrics_transactionMetrics_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubTransactionMetricEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ClubTransactionMetric",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "currency",
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

(node as any).hash = "93fec832bffb3336ce259d7879e1b5e8";

export default node;
