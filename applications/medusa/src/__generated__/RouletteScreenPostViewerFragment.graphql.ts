/**
 * @generated SignedSource<<cb29e8edc15b6f4e0a4202be275d962f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicContainedViewerFragment">;
  readonly " $fragmentType": "RouletteScreenPostViewerFragment";
};
export type RouletteScreenPostViewerFragment$key = {
  readonly " $data"?: RouletteScreenPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicContainedViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e0b10539744d4bd7b6220fa9f584b0f1";

export default node;
