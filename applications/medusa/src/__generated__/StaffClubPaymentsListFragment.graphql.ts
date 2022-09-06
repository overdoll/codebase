/**
 * @generated SignedSource<<73e182e3fdec928a4b77fff8bd0a58c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubPaymentsListFragment$data = {
  readonly id: string;
  readonly payments: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffClubPaymentCardFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "StaffClubPaymentsListFragment";
};
export type StaffClubPaymentsListFragment$key = {
  readonly " $data"?: StaffClubPaymentsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPaymentsListFragment">;
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
      "operation": require('./StaffClubPaymentsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffClubPaymentsListFragment",
  "selections": [
    {
      "alias": "payments",
      "args": null,
      "concreteType": "ClubPaymentConnection",
      "kind": "LinkedField",
      "name": "__StaffClubPayments_payments_connection",
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
    (v1/*: any*/)
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "fe625897172bba31c25bcccddb2d7ec2";

export default node;
