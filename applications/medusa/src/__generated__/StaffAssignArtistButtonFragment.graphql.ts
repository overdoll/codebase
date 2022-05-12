/**
 * @generated SignedSource<<1dea48030f3ba184b84a067621bf270d>>
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e74d296cdecc76e9c196b66523f3415a";

export default node;
