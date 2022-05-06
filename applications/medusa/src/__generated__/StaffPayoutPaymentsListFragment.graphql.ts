/**
 * @generated SignedSource<<5b8bafa868ae45294af3d27b9354aa3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPayoutPaymentsListFragment$data = {
  readonly payments: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffClubPaymentCardFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "StaffPayoutPaymentsListFragment";
};
export type StaffPayoutPaymentsListFragment = StaffPayoutPaymentsListFragment$data;
export type StaffPayoutPaymentsListFragment$key = {
  readonly " $data"?: StaffPayoutPaymentsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPayoutPaymentsListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "payments"
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
      "operation": require('./StaffPayoutPaymentsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffPayoutPaymentsListFragment",
  "selections": [
    {
      "alias": "payments",
      "args": null,
      "concreteType": "ClubPaymentConnection",
      "kind": "LinkedField",
      "name": "__StaffPayoutPayments_payments_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubPaymentEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ClubPayment",
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
                  "name": "StaffClubPaymentCardFragment"
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
  "type": "ClubPayout",
  "abstractKey": null
};
})();

(node as any).hash = "32e7c54b61da4431147ac3a0ede38f7d";

export default node;
