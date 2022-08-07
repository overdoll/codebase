/**
 * @generated SignedSource<<2b7f3fed1213bfd72d19d0b9ccb1f1d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountActiveClubSupporterSubscriptionDetailsFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly suspension: {
      readonly expires: any;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
  };
  readonly nextBillingDate: any;
  readonly supporterSince: any;
  readonly " $fragmentType": "AccountActiveClubSupporterSubscriptionDetailsFragment";
};
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubThumbnailFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "415dee9e8c1a092dea74b151c71fe4e9";

export default node;
