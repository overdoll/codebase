/**
 * @generated SignedSource<<4b1a0788fce777444b84dfe647c933ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountActiveClubSupporterSubscriptionDetailsFragment$data = {
  readonly supporterSince: any;
  readonly nextBillingDate: any;
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly suspension: {
      readonly expires: any;
    } | null;
  };
  readonly " $fragmentType": "AccountActiveClubSupporterSubscriptionDetailsFragment";
};
export type AccountActiveClubSupporterSubscriptionDetailsFragment = AccountActiveClubSupporterSubscriptionDetailsFragment$data;
export type AccountActiveClubSupporterSubscriptionDetailsFragment$key = {
  readonly " $data"?: AccountActiveClubSupporterSubscriptionDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionDetailsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountActiveClubSupporterSubscriptionDetailsFragment",
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
      "name": "nextBillingDate",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubSuspension",
          "kind": "LinkedField",
          "name": "suspension",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "expires",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "c23346724579f956d0a9f88a022d2d6c";

export default node;
