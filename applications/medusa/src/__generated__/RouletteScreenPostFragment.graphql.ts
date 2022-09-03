/**
 * @generated SignedSource<<4825f5a1539d83b994e95adf05f7d15d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenPostFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicContainedFragment">;
  readonly " $fragmentType": "RouletteScreenPostFragment";
};
export type RouletteScreenPostFragment$key = {
  readonly " $data"?: RouletteScreenPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicContainedFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "678d916b03b76b594c26d8798b378864";

export default node;
