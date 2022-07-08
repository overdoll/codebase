/**
 * @generated SignedSource<<b7cfc2964b144a202df22493c7d2e4d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CCBillSubscribeFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "CCBillSubscribeFormFragment";
};
export type CCBillSubscribeFormFragment$key = {
  readonly " $data"?: CCBillSubscribeFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CCBillSubscribeFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CCBillSubscribeFormFragment",
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

(node as any).hash = "3723bfa2cd46882847d136bf27503d49";

export default node;
