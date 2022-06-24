/**
 * @generated SignedSource<<c9a53617fe1a8f7938c1d21c3c914a4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCategoryThumbnailFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeCategoryThumbnailFormFragment";
};
export type ChangeCategoryThumbnailFormFragment$key = {
  readonly " $data"?: ChangeCategoryThumbnailFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryThumbnailFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCategoryThumbnailFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "396f448cb7fe7aac473aaa348a0d0874";

export default node;
