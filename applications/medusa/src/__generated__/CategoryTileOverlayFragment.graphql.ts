/**
 * @generated SignedSource<<aa1cde2899bb983cf2f6330c77a28edc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryTileOverlayFragment$data = {
  readonly id: string;
  readonly title: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  } | null;
  readonly " $fragmentType": "CategoryTileOverlayFragment";
};
export type CategoryTileOverlayFragment = CategoryTileOverlayFragment$data;
export type CategoryTileOverlayFragment$key = {
  readonly " $data"?: CategoryTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryTileOverlayFragment",
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
      "name": "title",
      "storageKey": null
    },
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
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "adf8a4d8ac78b670678be077e3090c8b";

export default node;
