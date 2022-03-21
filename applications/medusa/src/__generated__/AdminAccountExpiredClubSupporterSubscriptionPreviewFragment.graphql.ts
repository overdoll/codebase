/**
 * @generated SignedSource<<3f9761c6f748bbda3a38c5b30b9491c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAccountExpiredClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly expiredAt: any;
  readonly club: {
    readonly name: string;
  };
  readonly " $fragmentType": "AdminAccountExpiredClubSupporterSubscriptionPreviewFragment";
};
export type AdminAccountExpiredClubSupporterSubscriptionPreviewFragment = AdminAccountExpiredClubSupporterSubscriptionPreviewFragment$data;
export type AdminAccountExpiredClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: AdminAccountExpiredClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountExpiredClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountExpiredClubSupporterSubscriptionPreviewFragment",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountExpiredClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "cb9507d3e8985cacc9ddf213eabf4ce9";

export default node;
