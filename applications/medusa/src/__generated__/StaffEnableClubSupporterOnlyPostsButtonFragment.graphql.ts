/**
 * @generated SignedSource<<cb404a390fa608c4bd7b8b96ee35ec81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffEnableClubSupporterOnlyPostsButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffEnableClubSupporterOnlyPostsButtonFragment";
};
export type StaffEnableClubSupporterOnlyPostsButtonFragment$key = {
  readonly " $data"?: StaffEnableClubSupporterOnlyPostsButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffEnableClubSupporterOnlyPostsButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffEnableClubSupporterOnlyPostsButtonFragment",
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

(node as any).hash = "56a4b29287e9c82efbed966da394cab0";

export default node;
