/**
 * @generated SignedSource<<bff5ac5e53d28f896ee39fb8ae12ca98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountClubSupporterSubscriptionsFragment$data = {
  readonly clubSupporterSubscriptions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id?: string;
        readonly reference?: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffAccountClubSupporterSubscriptionPreviewFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "StaffAccountClubSupporterSubscriptionsFragment";
};
export type StaffAccountClubSupporterSubscriptionsFragment$key = {
  readonly " $data"?: StaffAccountClubSupporterSubscriptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountClubSupporterSubscriptionsFragment">;
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
      "operation": require('./StaffAccountClubSupporterSubscriptionsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffAccountClubSupporterSubscriptionsFragment",
  "selections": [
    {
      "alias": "clubSupporterSubscriptions",
      "args": null,
      "concreteType": "AccountClubSupporterSubscriptionConnection",
      "kind": "LinkedField",
      "name": "__StaffAccountClubSupporterSubscriptions_clubSupporterSubscriptions_connection",
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
                    (v1/*: any*/),
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
                  "name": "StaffAccountClubSupporterSubscriptionPreviewFragment"
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

(node as any).hash = "44f3d88f4174f97e144fa8cb762a1670";

export default node;
