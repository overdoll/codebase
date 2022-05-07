/**
 * @generated SignedSource<<1fa7c682a37c54f2976ccad8fe74e11f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffDepositRequestPayoutsListFragment$data = {
  readonly payouts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutCardFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "StaffDepositRequestPayoutsListFragment";
};
export type StaffDepositRequestPayoutsListFragment = StaffDepositRequestPayoutsListFragment$data;
export type StaffDepositRequestPayoutsListFragment$key = {
  readonly " $data"?: StaffDepositRequestPayoutsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffDepositRequestPayoutsListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "payouts"
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
      "operation": require('./StaffDepositRequestPayoutsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffDepositRequestPayoutsListFragment",
  "selections": [
    {
      "alias": "payouts",
      "args": null,
      "concreteType": "ClubPayoutConnection",
      "kind": "LinkedField",
      "name": "__StaffDepositRequestPayouts_payouts_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubPayoutEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ClubPayout",
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
                  "name": "StaffClubPayoutCardFragment"
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
  "type": "DepositRequest",
  "abstractKey": null
};
})();

(node as any).hash = "80fdf43672cb657bf219998472c460df";

export default node;
