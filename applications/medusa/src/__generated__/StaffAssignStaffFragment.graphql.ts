/**
 * @generated SignedSource<<e7f9ee394f177a79323fc40e9671eb9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAssignStaffFragment$data = {
  readonly isStaff: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignStaffButtonFragment" | "StaffRevokeStaffButtonFragment">;
  readonly " $fragmentType": "StaffAssignStaffFragment";
};
export type StaffAssignStaffFragment = StaffAssignStaffFragment$data;
export type StaffAssignStaffFragment$key = {
  readonly " $data"?: StaffAssignStaffFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignStaffFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAssignStaffFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isStaff",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffAssignStaffButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffRevokeStaffButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "90e0d474b4c55afedcf9aa2f017c6760";

export default node;
