/**
 * @generated SignedSource<<c8133c82d4ed2a29b955024d290b2318>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffGenerateRefundAmountForAccountTransactionInputFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffGenerateRefundAmountForAccountTransactionInputFragment";
};
export type StaffGenerateRefundAmountForAccountTransactionInputFragment = StaffGenerateRefundAmountForAccountTransactionInputFragment$data;
export type StaffGenerateRefundAmountForAccountTransactionInputFragment$key = {
  readonly " $data"?: StaffGenerateRefundAmountForAccountTransactionInputFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffGenerateRefundAmountForAccountTransactionInputFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffGenerateRefundAmountForAccountTransactionInputFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "e4317d0e5d0b37bf400111a17b38f1f6";

export default node;
