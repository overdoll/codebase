/**
 * @generated SignedSource<<60d1429a877537abf0d79de7aa20d011>>
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
export type CCBillSelectSavedPaymentFormFragment = CCBillSelectSavedPaymentFormFragment$data;
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
