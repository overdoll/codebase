/**
 * @generated SignedSource<<f700ae8ca3887634cf1aaf3e83a0e9da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPermissionsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffLockAccountFragment" | "StaffAssignModeratorFragment" | "StaffAssignStaffFragment">;
  readonly " $fragmentType": "StaffPermissionsFragment";
};
export type StaffPermissionsFragment = StaffPermissionsFragment$data;
export type StaffPermissionsFragment$key = {
  readonly " $data"?: StaffPermissionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffPermissionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffPermissionsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffLockAccountFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffAssignModeratorFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffAssignStaffFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "264bb754c37b2d707447bccf1131c54c";

export default node;
