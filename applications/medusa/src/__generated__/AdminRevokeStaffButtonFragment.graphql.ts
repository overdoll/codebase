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
export type AdminRevokeStaffButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "AdminRevokeStaffButtonFragment";
};
export type AdminRevokeStaffButtonFragment = AdminRevokeStaffButtonFragment$data;
export type AdminRevokeStaffButtonFragment$key = {
  readonly " $data"?: AdminRevokeStaffButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminRevokeStaffButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminRevokeStaffButtonFragment",
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
