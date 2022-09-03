/**
 * @generated SignedSource<<1990cac185be848ca3a9a2002533a1b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPayoutPaymentsListFragment$data = {
  readonly id: string;
  readonly payments: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"ClubPaymentCardFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ClubPayoutPaymentsListFragment";
};
export type ClubPayoutPaymentsListFragment$key = {
  readonly " $data"?: ClubPayoutPaymentsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPayoutPaymentsListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "payments"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
      "operation": require('./ClubPayoutPaymentsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubPayoutPaymentsListFragment",
  "selections": [
    {
      "alias": "payments",
      "args": null,
      "concreteType": "ClubPaymentConnection",
      "kind": "LinkedField",
      "name": "__ClubPayoutPayments_payments_connection",
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
                (v1/*: any*/),
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
                  "name": "ClubPaymentCardFragment"
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
    (v1/*: any*/)
  ],
  "type": "ClubPayout",
  "abstractKey": null
};
})();

(node as any).hash = "e1c808078918d8867f7ea6b63468120a";

export default node;
