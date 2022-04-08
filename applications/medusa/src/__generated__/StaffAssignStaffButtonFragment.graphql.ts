/**
 * @generated SignedSource<<fde536772deca0ddb1c3fde641a49c55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAssignStaffButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffAssignStaffButtonFragment";
};
export type StaffAssignStaffButtonFragment = StaffAssignStaffButtonFragment$data;
export type StaffAssignStaffButtonFragment$key = {
  readonly " $data"?: StaffAssignStaffButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignStaffButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAssignStaffButtonFragment",
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

(node as any).hash = "94587e5c289f8dd683f93db9bbca04dc";

export default node;
