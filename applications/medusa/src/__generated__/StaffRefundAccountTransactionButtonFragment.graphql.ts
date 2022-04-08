/**
 * @generated SignedSource<<53cb8c0a4f5d854e67d82d4caf87cdb5>>
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

(node as any).hash = "6e5d2e60c44464852796005f00d080ce";

export default node;
