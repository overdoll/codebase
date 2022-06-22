/**
 * @generated SignedSource<<a4394afaca186477b3fb6cb1484ed4ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PayoutMethod = "PAXUM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ChoosePayoutMethodFragment$data = {
  readonly payoutMethods: ReadonlyArray<PayoutMethod>;
  readonly " $fragmentType": "ChoosePayoutMethodFragment";
};
export type ChoosePayoutMethodFragment$key = {
  readonly " $data"?: ChoosePayoutMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChoosePayoutMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChoosePayoutMethodFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payoutMethods",
      "storageKey": null
    }
  ],
  "type": "Country",
  "abstractKey": null
};

(node as any).hash = "58f52ed10404b44be11acc12f3e5fb0f";

export default node;
