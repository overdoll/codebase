/**
 * @generated SignedSource<<bd2fefedafb05849c4609e0bb6a101d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubTransactionMetricsFragment$data = {
  readonly transactionMetrics: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ClubTransactionMetricFragment">;
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
      "defaultValue": 1,
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubTransactionMetricFragment"
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

(node as any).hash = "0fa38b3f498d157f2379f36e90d8812b";

export default node;
