/**
 * @generated SignedSource<<52b64a105d166460670f83ccf4369437>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffActiveClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly nextBillingDate: any;
  readonly account: {
    readonly username: string;
  };
  readonly " $fragmentType": "StaffActiveClubSupporterSubscriptionPreviewFragment";
};
export type StaffActiveClubSupporterSubscriptionPreviewFragment = StaffActiveClubSupporterSubscriptionPreviewFragment$data;
export type StaffActiveClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: StaffActiveClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffActiveClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffActiveClubSupporterSubscriptionPreviewFragment",
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
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "account",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "904636a1c8a4ba1edf89fc5ec1ea65ab";

export default node;
