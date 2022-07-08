/**
 * @generated SignedSource<<18fae8958b5fbcd7a258ab452ab57c18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPermissionsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignArtistFragment" | "StaffAssignModeratorFragment" | "StaffAssignStaffFragment" | "StaffLockAccountFragment">;
  readonly " $fragmentType": "StaffPermissionsFragment";
};
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffAssignArtistFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "7e7ea8173a54b09aa724e97f10a2c208";

export default node;
