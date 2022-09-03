/**
 * @generated SignedSource<<9ec4bd8f84f4eb9eba25502cb9d79346>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubTransactionMetricsFragment$data = {
  readonly id: string;
  readonly transactionMetrics: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ClubTransactionMetricFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ClubTransactionMetricsFragment";
};
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
                  "kind": "ClientExtension",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__id",
                      "storageKey": null
                    }
                  ]
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

(node as any).hash = "450c02a5e982f533de4c3247c4cd94a5";

export default node;
