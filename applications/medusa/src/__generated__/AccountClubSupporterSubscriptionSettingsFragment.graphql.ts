/**
 * @generated SignedSource<<c3192bf1e65fa93ef51e47864dda7597>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountClubSupporterSubscriptionSettingsFragment$data = {
  readonly clubSupporterSubscriptions: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly __typename: "AccountClubSupporterSubscriptionEdge";
    }>;
  };
  readonly " $fragmentType": "AccountClubSupporterSubscriptionSettingsFragment";
};
export type AccountClubSupporterSubscriptionSettingsFragment$key = {
  readonly " $data"?: AccountClubSupporterSubscriptionSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountClubSupporterSubscriptionSettingsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
        "path": [
          "clubSupporterSubscriptions"
        ]
      }
    ]
  },
  "name": "AccountClubSupporterSubscriptionSettingsFragment",
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
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
      "storageKey": "__ClubSupporterSubscriptions_clubSupporterSubscriptions_connection(status:[\"ACTIVE\",\"CANCELLED\"])"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "3ac85f41261cf916134ee673b67bc401";

export default node;
