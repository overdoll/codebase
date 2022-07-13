/**
 * @generated SignedSource<<d5cdecaddda180c55b6870863f0e6bac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubThumbnailUploadFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeClubThumbnailUploadFragment";
};
export type ChangeClubThumbnailUploadFragment$key = {
  readonly " $data"?: ChangeClubThumbnailUploadFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubThumbnailUploadFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubThumbnailUploadFragment",
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

(node as any).hash = "0b5a87e9c65610dc029849db577e56f2";

export default node;
