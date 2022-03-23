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
export type AdminGenerateRefundAmountForAccountTransactionInputFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "AdminGenerateRefundAmountForAccountTransactionInputFragment";
};
export type AdminGenerateRefundAmountForAccountTransactionInputFragment = AdminGenerateRefundAmountForAccountTransactionInputFragment$data;
export type AdminGenerateRefundAmountForAccountTransactionInputFragment$key = {
  readonly " $data"?: AdminGenerateRefundAmountForAccountTransactionInputFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminGenerateRefundAmountForAccountTransactionInputFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminGenerateRefundAmountForAccountTransactionInputFragment",
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
