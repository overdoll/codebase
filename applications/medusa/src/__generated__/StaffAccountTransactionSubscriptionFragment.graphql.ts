/**
 * @generated SignedSource<<8c6776be7a6d29659d078d0a09aa51f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountTransactionSubscriptionFragment$data = {
  readonly clubSupporterSubscription: {
    readonly reference?: string;
    readonly " $fragmentSpreads": FragmentRefs<"StaffClubSupporterSubscriptionPreviewFragment">;
  };
  readonly " $fragmentType": "StaffAccountTransactionSubscriptionFragment";
};
export type StaffAccountTransactionSubscriptionFragment = StaffAccountTransactionSubscriptionFragment$data;
export type StaffAccountTransactionSubscriptionFragment$key = {
  readonly " $data"?: StaffAccountTransactionSubscriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountTransactionSubscriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountTransactionSubscriptionFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "clubSupporterSubscription",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "reference",
                "storageKey": null
              }
            ],
            "type": "IAccountClubSupporterSubscription",
            "abstractKey": "__isIAccountClubSupporterSubscription"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffClubSupporterSubscriptionPreviewFragment"
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "clubSupporterSubscription"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "ab853915a57d9b459f33191c9f06cee9";

export default node;
