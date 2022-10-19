/**
 * @generated SignedSource<<fb744cc0e45c3e2c023bf70809e00b05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubTransferOwnershipFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffClubTransferOwnershipFormFragment";
};
export type StaffClubTransferOwnershipFormFragment$key = {
  readonly " $data"?: StaffClubTransferOwnershipFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubTransferOwnershipFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubTransferOwnershipFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b994c0f144d0ca720741421c11224f4f";

export default node;
