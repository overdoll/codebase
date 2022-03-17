/**
 * @generated SignedSource<<aa1bc1b8895b695f29cc05b75bff5ec4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountCancelledClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly cancelledAt: any;
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ManageCancelledSubscriptionButtonFragment">;
  readonly " $fragmentType": "AccountCancelledClubSupporterSubscriptionPreviewFragment";
};
export type AccountCancelledClubSupporterSubscriptionPreviewFragment = AccountCancelledClubSupporterSubscriptionPreviewFragment$data;
export type AccountCancelledClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: AccountCancelledClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountCancelledClubSupporterSubscriptionPreviewFragment",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageCancelledSubscriptionButtonFragment"
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "9f7b835a46d0851533c8e987482c83a3";

export default node;
