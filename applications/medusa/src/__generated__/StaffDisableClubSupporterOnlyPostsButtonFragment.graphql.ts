/**
 * @generated SignedSource<<25cc941235d0b895f83d71fc0cfa442e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffDisableClubSupporterOnlyPostsButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffDisableClubSupporterOnlyPostsButtonFragment";
};
export type StaffDisableClubSupporterOnlyPostsButtonFragment$key = {
  readonly " $data"?: StaffDisableClubSupporterOnlyPostsButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffDisableClubSupporterOnlyPostsButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffDisableClubSupporterOnlyPostsButtonFragment",
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

(node as any).hash = "357d6f4f1ac8bf4a7fdba5b2d6c404a5";

export default node;
