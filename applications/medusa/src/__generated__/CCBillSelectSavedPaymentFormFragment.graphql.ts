/**
 * @generated SignedSource<<359e7c58a1c771c48fa62a2142a80404>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CCBillSelectSavedPaymentFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "CCBillSelectSavedPaymentFormFragment";
};
export type CCBillSelectSavedPaymentFormFragment$key = {
  readonly " $data"?: CCBillSelectSavedPaymentFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CCBillSelectSavedPaymentFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CCBillSelectSavedPaymentFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "322ed40d6e252972151f1e182c64e736";

export default node;
