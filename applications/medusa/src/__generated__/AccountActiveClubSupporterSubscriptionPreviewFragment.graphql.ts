/**
 * @generated SignedSource<<b5d0bfaaf24e947634a5eb95270a8f18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountActiveClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly nextBillingDate: any;
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ManageActiveSubscriptionButtonFragment">;
  readonly " $fragmentType": "AccountActiveClubSupporterSubscriptionPreviewFragment";
};
export type AccountActiveClubSupporterSubscriptionPreviewFragment = AccountActiveClubSupporterSubscriptionPreviewFragment$data;
export type AccountActiveClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: AccountActiveClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountActiveClubSupporterSubscriptionPreviewFragment",
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageActiveSubscriptionButtonFragment"
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "592aef6b4d814fe0b967ca713a816fe3";

export default node;
