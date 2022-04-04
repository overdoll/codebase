/**
 * @generated SignedSource<<ba2797395fd96851402753a5fa2372f9>>
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
export type StaffLockAccountFormFragment = StaffLockAccountFormFragment$data;
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

(node as any).hash = "6437a63443d403313fbdac8000976df8";

export default node;
