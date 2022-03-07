/**
 * @generated SignedSource<<688d1fc587dbc1178bfcfbcb79c18906>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportSelectMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodFragment">;
  readonly " $fragmentType": "SupportSelectMethodFragment";
};
export type SupportSelectMethodFragment = SupportSelectMethodFragment$data;
export type SupportSelectMethodFragment$key = {
  readonly " $data"?: SupportSelectMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportSelectMethodFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NewPaymentMethodFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "369960b9cff085e3a7ed5614c323c5d5";

export default node;
