/**
 * @generated SignedSource<<6525d441881b166a855a0a68e6d38e90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CancelSubscriptionButtonFragment$data = {
  readonly id: string;
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment">;
  };
  readonly nextBillingDate: any;
  readonly " $fragmentType": "CancelSubscriptionButtonFragment";
};
export type CancelSubscriptionButtonFragment = CancelSubscriptionButtonFragment$data;
export type CancelSubscriptionButtonFragment$key = {
  readonly " $data"?: CancelSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CancelSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelSubscriptionButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "LargeClubHeaderFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextBillingDate",
      "storageKey": null
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "cbb6df0b73c6f89fa3331ad844e1e82f";

export default node;
