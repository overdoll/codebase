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
export type AdminAssignStaffFragment$data = {
  readonly isStaff: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAssignStaffButtonFragment" | "AdminRevokeStaffButtonFragment">;
  readonly " $fragmentType": "AdminAssignStaffFragment";
};
export type AdminAssignStaffFragment = AdminAssignStaffFragment$data;
export type AdminAssignStaffFragment$key = {
  readonly " $data"?: AdminAssignStaffFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAssignStaffFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAssignStaffFragment",
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
      "name": "AdminAssignStaffButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminRevokeStaffButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1cdbfd723d33f761dcadacff1f13ae80";

export default node;
