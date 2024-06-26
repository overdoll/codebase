/**
 * @generated SignedSource<<4e4f8e0c691d9775d96a96b7b2c68af9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffSyncSubscriptionButtonFragment$data = {
  readonly ccbillSubscription: {
    readonly ccbillSubscriptionId: string;
  };
  readonly " $fragmentType": "StaffSyncSubscriptionButtonFragment";
};
export type StaffSyncSubscriptionButtonFragment$key = {
  readonly " $data"?: StaffSyncSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffSyncSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffSyncSubscriptionButtonFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "CCBillSubscription",
        "kind": "LinkedField",
        "name": "ccbillSubscription",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "ccbillSubscriptionId",
              "storageKey": null
            },
            "action": "THROW",
            "path": "ccbillSubscription.ccbillSubscriptionId"
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "ccbillSubscription"
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
};

(node as any).hash = "6537b60fc5a743968cf53134a2017e72";

export default node;
