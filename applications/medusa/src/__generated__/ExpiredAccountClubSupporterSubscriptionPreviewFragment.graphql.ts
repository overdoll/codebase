/**
 * @generated SignedSource<<f4ebd749b36e0271b042ac206096ce23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpiredAccountClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly expiredAt: any;
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly thumbnail: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ManageExpiredSubscriptionButtonFragment">;
  readonly " $fragmentType": "ExpiredAccountClubSupporterSubscriptionPreviewFragment";
};
export type ExpiredAccountClubSupporterSubscriptionPreviewFragment = ExpiredAccountClubSupporterSubscriptionPreviewFragment$data;
export type ExpiredAccountClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: ExpiredAccountClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpiredAccountClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpiredAccountClubSupporterSubscriptionPreviewFragment",
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
      "name": "expiredAt",
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
      "name": "ManageExpiredSubscriptionButtonFragment"
    }
  ],
  "type": "ExpiredAccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "0214ef65e49e169556292bee026f3891";

export default node;
