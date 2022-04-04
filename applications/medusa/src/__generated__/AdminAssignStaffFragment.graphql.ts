/**
 * @generated SignedSource<<f82a4fe1e64ac8e1cbcae2b2d3c86570>>
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

(node as any).hash = "1cdbfd723d33f761dcadacff1f13ae80";

export default node;
