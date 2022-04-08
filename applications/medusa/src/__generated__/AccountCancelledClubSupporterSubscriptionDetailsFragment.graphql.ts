/**
 * @generated SignedSource<<a9d1bd44a74899780d2a7b2a24d6c926>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountCancelledClubSupporterSubscriptionDetailsFragment$data = {
  readonly supporterSince: any;
  readonly cancelledAt: any;
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
  };
  readonly " $fragmentType": "AccountCancelledClubSupporterSubscriptionDetailsFragment";
};
export type AccountCancelledClubSupporterSubscriptionDetailsFragment = AccountCancelledClubSupporterSubscriptionDetailsFragment$data;
export type AccountCancelledClubSupporterSubscriptionDetailsFragment$key = {
  readonly " $data"?: AccountCancelledClubSupporterSubscriptionDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionDetailsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountCancelledClubSupporterSubscriptionDetailsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "supporterSince",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cancelledAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "thumbnail",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceIconFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "c4015224cf32b19a3cb15310a73b6efb";

export default node;
