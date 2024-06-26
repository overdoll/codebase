/**
 * @generated SignedSource<<d016ee8c4ca4d3e30eb2d840d1da1cfc>>
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

(node as any).hash = "d05045937435a1a98e0c904edf1e2861";

export default node;
