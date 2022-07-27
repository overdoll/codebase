/**
 * @generated SignedSource<<b777c7dfab4f691a0859a884ebee0688>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpiredAccountClubSupporterSubscriptionPreviewFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
  };
  readonly expiredAt: any;
  readonly supporterSince: any;
  readonly " $fragmentSpreads": FragmentRefs<"ManageExpiredSubscriptionButtonFragment">;
  readonly " $fragmentType": "ExpiredAccountClubSupporterSubscriptionPreviewFragment";
};
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubThumbnailFragment"
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

(node as any).hash = "eee8a24bbacf9e71bcf52e283b73b224";

export default node;
