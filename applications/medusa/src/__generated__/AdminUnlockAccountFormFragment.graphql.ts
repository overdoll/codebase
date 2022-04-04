/**
 * @generated SignedSource<<0a2db64a4eea7dbd82f76c1a58a8298d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffUnlockAccountFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffUnlockAccountFormFragment";
};
export type StaffUnlockAccountFormFragment = StaffUnlockAccountFormFragment$data;
export type StaffUnlockAccountFormFragment$key = {
  readonly " $data"?: StaffUnlockAccountFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffUnlockAccountFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffUnlockAccountFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "00b545e065670a98ea5a05ce098819a0";

export default node;
