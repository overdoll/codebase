/**
 * @generated SignedSource<<45904dfa9b531b04ebbce1aae5e760ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportSelectMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodFragment" | "SavedPaymentMethodFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavedPaymentMethodFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "5848ee3553c6c45cd5e85dd928c90fb5";

export default node;
