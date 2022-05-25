/**
 * @generated SignedSource<<368ff01e623f9ba04d96627eacbb7e4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffRevokeArtistButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffRevokeArtistButtonFragment";
};
export type StaffRevokeArtistButtonFragment = StaffRevokeArtistButtonFragment$data;
export type StaffRevokeArtistButtonFragment$key = {
  readonly " $data"?: StaffRevokeArtistButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffRevokeArtistButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffRevokeArtistButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2ddf7c7482b2359c6ac8a1ba598119cd";

export default node;
