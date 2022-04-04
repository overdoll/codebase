/**
 * @generated SignedSource<<42ffe524caa91a52e46896a5c590fd12>>
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

(node as any).hash = "f3af8723321f1ee62fe9bd6ceef75dd3";

export default node;
