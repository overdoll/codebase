/**
 * @generated SignedSource<<e0c4cc9924fb36786b2602b946f35ae2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewPaymentMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChooseCurrencyFragment" | "BillingSummaryFragment" | "CCBillSubscribeFormFragment">;
  readonly " $fragmentType": "NewPaymentMethodFragment";
};
export type NewPaymentMethodFragment = NewPaymentMethodFragment$data;
export type NewPaymentMethodFragment$key = {
  readonly " $data"?: NewPaymentMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewPaymentMethodFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChooseCurrencyFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BillingSummaryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CCBillSubscribeFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "15a4bbebb10aeca5a002378e4719f8b7";

export default node;