/**
 * @generated SignedSource<<6ae95cd1cb62cebd7cddc0a1161133b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAccountCancelledClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly endDate: any;
  readonly club: {
    readonly name: string;
  };
  readonly " $fragmentType": "AdminAccountCancelledClubSupporterSubscriptionPreviewFragment";
};
export type AdminAccountCancelledClubSupporterSubscriptionPreviewFragment = AdminAccountCancelledClubSupporterSubscriptionPreviewFragment$data;
export type AdminAccountCancelledClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: AdminAccountCancelledClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountCancelledClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountCancelledClubSupporterSubscriptionPreviewFragment",
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
      "name": "endDate",
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
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "e055fdbfc147a276c59f8f629b182490";

export default node;
