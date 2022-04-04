/**
 * @generated SignedSource<<ccd2cebbb4fbc892f94a6793ab43a832>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffRefundAccountTransactionFormFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"StaffGenerateRefundAmountForAccountTransactionInputFragment">;
  readonly " $fragmentType": "StaffRefundAccountTransactionFormFragment";
};
export type StaffRefundAccountTransactionFormFragment = StaffRefundAccountTransactionFormFragment$data;
export type StaffRefundAccountTransactionFormFragment$key = {
  readonly " $data"?: StaffRefundAccountTransactionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRefundAccountTransactionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffRefundAccountTransactionFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffGenerateRefundAmountForAccountTransactionInputFragment"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "30fc2949ce45432e50b9bec5ea00e8f3";

export default node;
