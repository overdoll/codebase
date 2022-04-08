/**
 * @generated SignedSource<<45af1b0ddb34b43d1a0db8a971399663>>
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

(node as any).hash = "fab28a9f18fde10f84aa0f9b4afe5613";

export default node;