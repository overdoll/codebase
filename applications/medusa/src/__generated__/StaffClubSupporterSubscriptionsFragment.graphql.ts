/**
 * @generated SignedSource<<d13a4bf87e0435eef27beaba6a27dc89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSupporterSubscriptionsFragment$data = {
  readonly clubSupporterSubscriptions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly reference?: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffClubSupporterSubscriptionPreviewFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "StaffClubSupporterSubscriptionsFragment";
};
export type StaffClubSupporterSubscriptionsFragment = StaffClubSupporterSubscriptionsFragment$data;
export type StaffClubSupporterSubscriptionsFragment$key = {
  readonly " $data"?: StaffClubSupporterSubscriptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSupporterSubscriptionsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "clubSupporterSubscriptions"
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
      "operation": require('./StaffClubSupporterSubscriptionsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffClubSupporterSubscriptionsFragment",
  "selections": [
    {
      "alias": "clubSupporterSubscriptions",
      "args": null,
      "concreteType": "AccountClubSupporterSubscriptionConnection",
      "kind": "LinkedField",
      "name": "__StaffClubSupporterSubscriptions_clubSupporterSubscriptions_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountClubSupporterSubscriptionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "reference",
                      "storageKey": null
                    }
                  ],
                  "type": "IAccountClubSupporterSubscription",
                  "abstractKey": "__isIAccountClubSupporterSubscription"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "StaffClubSupporterSubscriptionPreviewFragment"
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
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "46e0ddeabda8760f5e780b79aec6b84f";

export default node;
