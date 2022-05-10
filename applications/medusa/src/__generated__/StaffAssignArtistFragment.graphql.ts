/**
 * @generated SignedSource<<f8ccc75afd3eefbd0722286720c64ddf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAssignArtistFragment$data = {
  readonly isArtist: boolean;
  readonly isSecure: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignArtistButtonFragment" | "StaffRevokeArtistButtonFragment">;
  readonly " $fragmentType": "StaffAssignArtistFragment";
};
export type StaffAssignArtistFragment = StaffAssignArtistFragment$data;
export type StaffAssignArtistFragment$key = {
  readonly " $data"?: StaffAssignArtistFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAssignArtistFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAssignArtistFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isArtist",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSecure",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffAssignArtistButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffRevokeArtistButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "72f7f8d1951463dc3fa95f5593cada92";

export default node;
