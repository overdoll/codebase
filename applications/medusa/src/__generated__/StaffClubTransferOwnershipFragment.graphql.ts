/**
 * @generated SignedSource<<65aa65c46428954e4ca0a63dbf763d63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubTransferOwnershipFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubTransferOwnershipFormFragment">;
  readonly " $fragmentType": "StaffClubTransferOwnershipFragment";
};
export type StaffClubTransferOwnershipFragment$key = {
  readonly " $data"?: StaffClubTransferOwnershipFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubTransferOwnershipFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubTransferOwnershipFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffClubTransferOwnershipFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d21f621c05f1832c3503563ee95c1275";

export default node;
