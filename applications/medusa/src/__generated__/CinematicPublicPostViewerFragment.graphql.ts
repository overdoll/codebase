/**
 * @generated SignedSource<<16e8f3bb6a7071d8b5a4a56f6016ea5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedViewerFragment">;
  readonly " $fragmentType": "CinematicPublicPostViewerFragment";
};
export type CinematicPublicPostViewerFragment$key = {
  readonly " $data"?: CinematicPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CinematicPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "04954ac25383cac08dff5799e2869a73";

export default node;
