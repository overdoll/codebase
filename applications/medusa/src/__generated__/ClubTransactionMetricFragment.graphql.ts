/**
 * @generated SignedSource<<afeece8d4af97fe99599a8aa9bd5dd71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubTransactionMetricFragment$data = {
  readonly chargebacksAmount: number;
  readonly chargebacksAmountRatio: number;
  readonly chargebacksCount: number;
  readonly currency: Currency;
  readonly month: number;
  readonly refundsAmount: number;
  readonly refundsAmountRatio: number;
  readonly refundsCount: number;
  readonly totalTransactionsAmount: number;
  readonly year: number;
  readonly " $fragmentType": "ClubTransactionMetricFragment";
};
export type ClubTransactionMetricFragment$key = {
  readonly " $data"?: ClubTransactionMetricFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubTransactionMetricFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubTransactionMetricFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "month",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "year",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "chargebacksAmountRatio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "chargebacksAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "chargebacksCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "refundsAmountRatio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "refundsAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "refundsCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalTransactionsAmount",
      "storageKey": null
    }
  ],
  "type": "ClubTransactionMetric",
  "abstractKey": null
};

(node as any).hash = "35fa7b4ee846df6a822153ae1aa9893a";

export default node;
