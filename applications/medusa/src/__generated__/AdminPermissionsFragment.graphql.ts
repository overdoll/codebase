/**
 * @generated SignedSource<<14a7241283e76e07d6d4e5d5a911460b>>
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

(node as any).hash = "2ac41a6dbb7e3f9b93cdefe9f7c6dbee";

export default node;
