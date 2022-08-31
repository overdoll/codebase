/**
 * @generated SignedSource<<6b32911966b88ab1554df94a4b0c2402>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicContainedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentViewerFragment">;
  readonly " $fragmentType": "PostGalleryPublicContainedViewerFragment";
};
export type PostGalleryPublicContainedViewerFragment$key = {
  readonly " $data"?: PostGalleryPublicContainedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicContainedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicContainedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSupporterContentViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "65b6457646b49f9c6e3f24db4e762ecb";

export default node;
