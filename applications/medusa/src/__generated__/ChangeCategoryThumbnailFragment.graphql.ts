/**
 * @generated SignedSource<<8d192c08602018617f9cbff8048ee10a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCategoryThumbnailFragment$data = {
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeCategoryThumbnailFragment";
};
export type ChangeCategoryThumbnailFragment = ChangeCategoryThumbnailFragment$data;
export type ChangeCategoryThumbnailFragment$key = {
  readonly " $data"?: ChangeCategoryThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCategoryThumbnailFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeCategoryThumbnailFormFragment"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "0e32ff2ca2db18f771a6d556f50e9772";

export default node;
