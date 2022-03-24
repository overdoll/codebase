/**
 * @generated SignedSource<<2f11aa7028063cc66ba8ad00da39d97f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminClubSupporterSubscriptionsFragment$data = {
  readonly clubSupporterSubscriptions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly reference?: string;
        readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionPreviewFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "AdminClubSupporterSubscriptionsFragment";
};
export type AdminClubSupporterSubscriptionsFragment = AdminClubSupporterSubscriptionsFragment$data;
export type AdminClubSupporterSubscriptionsFragment$key = {
  readonly " $data"?: AdminClubSupporterSubscriptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionsFragment">;
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
      "operation": require('./AdminClubSupporterSubscriptionsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "AdminClubSupporterSubscriptionsFragment",
  "selections": [
    {
      "alias": "clubSupporterSubscriptions",
      "args": null,
      "concreteType": "AccountClubSupporterSubscriptionConnection",
      "kind": "LinkedField",
      "name": "__AdminClubSupporterSubscriptions_clubSupporterSubscriptions_connection",
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
                  "name": "AdminClubSupporterSubscriptionPreviewFragment"
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

(node as any).hash = "5f874c438215608f05ccc6b6e5996244";

export default node;