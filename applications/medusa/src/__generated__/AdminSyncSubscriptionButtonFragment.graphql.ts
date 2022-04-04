/**
 * @generated SignedSource<<4a0e37a21c332de5ae4d4ab07699078c>>
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
export type StaffSyncSubscriptionButtonFragment = StaffSyncSubscriptionButtonFragment$data;
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

(node as any).hash = "98f9bdb8d055abd3abda982f131df7b7";

export default node;
