/**
 * @generated SignedSource<<3bcffcd8f794d6387dcc01a82816ca01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAssignArtistButtonFragment$data = {
  readonly id: string;
  readonly isSecure: boolean;
  readonly " $fragmentType": "StaffAssignArtistButtonFragment";
};
export type StaffAssignArtistButtonFragment = StaffAssignArtistButtonFragment$data;
export type StaffAssignArtistButtonFragment$key = {
  readonly " $data"?: StaffAssignArtistButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignArtistButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAssignArtistButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSecure",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "a529765e86fea7a8868a6cbb57e65868";

export default node;
