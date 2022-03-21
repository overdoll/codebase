/**
 * @generated SignedSource<<13dfb7955d10ef719d0f0c8335a0c29f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupporterSubscriptionsSettingsFragment$data = {
  readonly clubSupporterSubscriptions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "AccountActiveClubSupporterSubscription";
        readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionPreviewFragment">;
      } | {
        readonly __typename: "AccountCancelledClubSupporterSubscription";
        readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionPreviewFragment">;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubSupporterSubscriptionsSettingsFragment";
};
export type ClubSupporterSubscriptionsSettingsFragment = ClubSupporterSubscriptionsSettingsFragment$data;
export type ClubSupporterSubscriptionsSettingsFragment$key = {
  readonly " $data"?: ClubSupporterSubscriptionsSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupporterSubscriptionsSettingsFragment">;
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
      "operation": require('./ClubSupporterSubscriptionsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubSupporterSubscriptionsSettingsFragment",
  "selections": [
    {
      "alias": "clubSupporterSubscriptions",
      "args": [
        {
          "kind": "Literal",
          "name": "status",
          "value": [
            "ACTIVE",
            "CANCELLED"
          ]
        }
      ],
      "concreteType": "AccountClubSupporterSubscriptionConnection",
      "kind": "LinkedField",
      "name": "__ClubSupporterSubscriptions_clubSupporterSubscriptions_connection",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "AccountActiveClubSupporterSubscriptionPreviewFragment"
                    }
                  ],
                  "type": "AccountActiveClubSupporterSubscription",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "AccountCancelledClubSupporterSubscriptionPreviewFragment"
                    }
                  ],
                  "type": "AccountCancelledClubSupporterSubscription",
                  "abstractKey": null
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
      "storageKey": "__ClubSupporterSubscriptions_clubSupporterSubscriptions_connection(status:[\"ACTIVE\",\"CANCELLED\"])"
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

(node as any).hash = "c21a81ee9b47de4b40854b94bc5512b9";

export default node;
