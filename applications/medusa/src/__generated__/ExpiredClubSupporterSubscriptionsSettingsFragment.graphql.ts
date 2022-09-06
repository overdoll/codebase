/**
 * @generated SignedSource<<ca0b242cd7c10867fe2705851d1c4dcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpiredClubSupporterSubscriptionsSettingsFragment$data = {
  readonly expiredClubSupporterSubscriptions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ExpiredAccountClubSupporterSubscriptionPreviewFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "ExpiredClubSupporterSubscriptionsSettingsFragment";
};
export type ExpiredClubSupporterSubscriptionsSettingsFragment$key = {
  readonly " $data"?: ExpiredClubSupporterSubscriptionsSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpiredClubSupporterSubscriptionsSettingsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "expiredClubSupporterSubscriptions"
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
      "operation": require('./ExpiredClubSupporterSubscriptionsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ExpiredClubSupporterSubscriptionsSettingsFragment",
  "selections": [
    {
      "alias": "expiredClubSupporterSubscriptions",
      "args": null,
      "concreteType": "ExpiredAccountClubSupporterSubscriptionConnection",
      "kind": "LinkedField",
      "name": "__ExpiredClubSupporterSubscriptions_expiredClubSupporterSubscriptions_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ExpiredAccountClubSupporterSubscriptionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ExpiredAccountClubSupporterSubscription",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ExpiredAccountClubSupporterSubscriptionPreviewFragment"
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
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "be9212edc7fc056b09258f378233bcbd";

export default node;
