/**
 * @generated SignedSource<<bb33592e8e20a0be2d22f6bfaa1901cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffLockAccountFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffLockAccountFormFragment";
};
export type StaffLockAccountFormFragment$key = {
  readonly " $data"?: StaffLockAccountFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffLockAccountFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffLockAccountFormFragment",
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

(node as any).hash = "314caf0d974deef47783d25ee8aee8f5";

export default node;
