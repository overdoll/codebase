/**
 * @generated SignedSource<<8020f23abfa6ebad7db211243b12c51c>>
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
        readonly __id: string;
        readonly __typename: string;
        readonly id?: string;
        readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionPreviewFragment" | "AccountCancelledClubSupporterSubscriptionPreviewFragment">;
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
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
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
                  "selections": (v2/*: any*/),
                  "type": "Node",
                  "abstractKey": "__isNode"
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "IAccountClubSupporterSubscription",
                  "abstractKey": "__isIAccountClubSupporterSubscription"
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
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
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "AccountCancelledClubSupporterSubscriptionPreviewFragment"
                    }
                  ],
                  "type": "AccountCancelledClubSupporterSubscription",
                  "abstractKey": null
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
    (v1/*: any*/)
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "c5209d04aaf5e8af39ee2c0fda8dd9f5";

export default node;
