/**
 * @generated SignedSource<<a2189acdecbc42cd277c283e34868d6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffSearchCancellationReasonsFragment$data = {
  readonly cancellationReasons: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"CancellationReasonOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "StaffSearchCancellationReasonsFragment";
};
export type StaffSearchCancellationReasonsFragment = StaffSearchCancellationReasonsFragment$data;
export type StaffSearchCancellationReasonsFragment$key = {
  readonly " $data"?: StaffSearchCancellationReasonsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffSearchCancellationReasonsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "cancellationReasons"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
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
      "operation": require('./StaffSearchCancellationReasonsPaginationFragment.graphql')
    }
  },
  "name": "StaffSearchCancellationReasonsFragment",
  "selections": [
    {
      "alias": "cancellationReasons",
      "args": null,
      "concreteType": "CancellationReasonConnection",
      "kind": "LinkedField",
      "name": "__StaffCancellationReasonsConnection_cancellationReasons_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CancellationReasonEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CancellationReason",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reference",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CancellationReasonOverlayFragment"
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

(node as any).hash = "fa2e0b570427b23859818cc90caeefc0";

export default node;
