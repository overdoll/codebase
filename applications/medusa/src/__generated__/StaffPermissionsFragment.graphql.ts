/**
 * @generated SignedSource<<1f982ee07e5192d095fb5dca94040229>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPermissionsFragment$data = {
  readonly id: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "695724c3374904be242779b56faf17e7";

export default node;
