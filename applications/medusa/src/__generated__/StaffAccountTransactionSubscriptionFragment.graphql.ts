/**
 * @generated SignedSource<<41fc224ad0e0be377256371797415de1>>
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
    readonly " $fragmentSpreads": FragmentRefs<"StaffAccountClubSupporterSubscriptionPreviewFragment">;
  };
  readonly " $fragmentType": "StaffAccountTransactionSubscriptionFragment";
};
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
            "name": "StaffAccountClubSupporterSubscriptionPreviewFragment"
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

(node as any).hash = "90c039450a77620d4605503ec8416068";

export default node;
