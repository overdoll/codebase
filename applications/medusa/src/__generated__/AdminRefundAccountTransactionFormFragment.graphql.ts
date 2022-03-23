/**
 * @generated SignedSource<<b2064a7dbc95e02795ab8378c3f3356c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminRefundAccountTransactionFormFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"AdminGenerateRefundAmountForAccountTransactionInputFragment">;
  readonly " $fragmentType": "AdminRefundAccountTransactionFormFragment";
};
export type AdminRefundAccountTransactionFormFragment = AdminRefundAccountTransactionFormFragment$data;
export type AdminRefundAccountTransactionFormFragment$key = {
  readonly " $data"?: AdminRefundAccountTransactionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminRefundAccountTransactionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminRefundAccountTransactionFormFragment",
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
      "name": "AdminGenerateRefundAmountForAccountTransactionInputFragment"
    }
  ],
  "type": "AccountTransaction",
  "abstractKey": null
};

(node as any).hash = "3adb4931e281b351123d9cdee1c44079";

export default node;
