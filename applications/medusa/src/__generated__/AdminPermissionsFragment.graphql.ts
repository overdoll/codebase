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
export type AdminPermissionsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AdminLockAccountFragment" | "AdminAssignModeratorFragment" | "AdminAssignStaffFragment">;
  readonly " $fragmentType": "AdminPermissionsFragment";
};
export type AdminPermissionsFragment = AdminPermissionsFragment$data;
export type AdminPermissionsFragment$key = {
  readonly " $data"?: AdminPermissionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminPermissionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminPermissionsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminLockAccountFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminAssignModeratorFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminAssignStaffFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2ac41a6dbb7e3f9b93cdefe9f7c6dbee";

export default node;
