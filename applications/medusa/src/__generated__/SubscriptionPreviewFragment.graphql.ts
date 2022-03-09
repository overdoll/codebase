/**
 * @generated SignedSource<<30a8d38e2e997d5626659b3c032bd190>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AccountClubSupporterSubscriptionStatus = "ACTIVE" | "CANCELLED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly lastBillingDate: any;
  readonly cancelledAt: any | null;
  readonly nextBillingDate: any;
  readonly status: AccountClubSupporterSubscriptionStatus;
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ManageSubscriptionButtonFragment">;
  readonly " $fragmentType": "SubscriptionPreviewFragment";
};
export type SubscriptionPreviewFragment = SubscriptionPreviewFragment$data;
export type SubscriptionPreviewFragment$key = {
  readonly " $data"?: SubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubscriptionPreviewFragment",
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
      "name": "lastBillingDate",
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
      "kind": "ScalarField",
      "name": "nextBillingDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
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
      "name": "ManageSubscriptionButtonFragment"
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "41c6775d83fed47afdbfdebc9a41d694";

export default node;
