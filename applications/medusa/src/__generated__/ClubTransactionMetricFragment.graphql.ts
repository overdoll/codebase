/**
 * @generated SignedSource<<482c9fec8fb8fe5aeb433903dc1be70d>>
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
  readonly month: number;
  readonly year: number;
  readonly currency: Currency;
  readonly chargebacksAmountRatio: number;
  readonly chargebacksAmount: number;
  readonly chargebacksCount: number;
  readonly refundsAmountRatio: number;
  readonly refundsAmount: number;
  readonly refundsCount: number;
  readonly totalTransactionsAmount: number;
  readonly " $fragmentType": "ClubTransactionMetricFragment";
};
export type ClubTransactionMetricFragment = ClubTransactionMetricFragment$data;
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
