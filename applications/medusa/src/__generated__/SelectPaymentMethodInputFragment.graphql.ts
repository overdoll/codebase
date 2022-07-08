/**
 * @generated SignedSource<<636b3f2688826f6b95756becb038001f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectPaymentMethodInputFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SelectPaymentMethodFragment">;
  readonly " $fragmentType": "SelectPaymentMethodInputFragment";
};
export type SelectPaymentMethodInputFragment$key = {
  readonly " $data"?: SelectPaymentMethodInputFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectPaymentMethodInputFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectPaymentMethodInputFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectPaymentMethodFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ba12554f356029c6b9e3a28d18925589";

export default node;
