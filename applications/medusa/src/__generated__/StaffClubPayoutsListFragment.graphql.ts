/**
 * @generated SignedSource<<e051acbfbde0db93ab964daaadd521bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubPayoutsListFragment$data = {
  readonly id: string;
  readonly payouts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutCardFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "StaffClubPayoutsListFragment";
};
export type StaffClubPayoutsListFragment$key = {
  readonly " $data"?: StaffClubPayoutsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutsListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "payouts"
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
      "operation": require('./StaffClubPayoutsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffClubPayoutsListFragment",
  "selections": [
    {
      "alias": "payouts",
      "args": null,
      "concreteType": "ClubPayoutConnection",
      "kind": "LinkedField",
      "name": "__StaffClubPayouts_payouts_connection",
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
    (v1/*: any*/)
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "5676fdcbebdba483135885dc7180f929";

export default node;
