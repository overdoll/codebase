/**
 * @generated SignedSource<<34ec6dcb35121317b15b3e31a67fcd4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffRefundAccountTransactionButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffRefundAccountTransactionFormFragment">;
  readonly " $fragmentType": "StaffRefundAccountTransactionButtonFragment";
};
export type StaffRefundAccountTransactionButtonFragment = StaffRefundAccountTransactionButtonFragment$data;
export type StaffRefundAccountTransactionButtonFragment$key = {
  readonly " $data"?: StaffRefundAccountTransactionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRefundAccountTransactionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffRefundAccountTransactionButtonFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffRefundAccountTransactionFormFragment"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "111c07007fa818eaf8cf0e8aebed3911";

export default node;
