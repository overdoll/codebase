/**
 * @generated SignedSource<<c8ff8889490c9cf5ffccdb0a09b5670d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffRevokeStaffButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffRevokeStaffButtonFragment";
};
export type StaffRevokeStaffButtonFragment = StaffRevokeStaffButtonFragment$data;
export type StaffRevokeStaffButtonFragment$key = {
  readonly " $data"?: StaffRevokeStaffButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRevokeStaffButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffRevokeStaffButtonFragment",
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

(node as any).hash = "7d7ce2c804169851ccd5ebe8b9dafa38";

export default node;
