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
export type AdminRefundAccountTransactionButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AdminRefundAccountTransactionFormFragment">;
  readonly " $fragmentType": "AdminRefundAccountTransactionButtonFragment";
};
export type AdminRefundAccountTransactionButtonFragment = AdminRefundAccountTransactionButtonFragment$data;
export type AdminRefundAccountTransactionButtonFragment$key = {
  readonly " $data"?: AdminRefundAccountTransactionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminRefundAccountTransactionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminRefundAccountTransactionButtonFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminRefundAccountTransactionFormFragment"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "111c07007fa818eaf8cf0e8aebed3911";

export default node;
