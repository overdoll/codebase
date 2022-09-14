/**
 * @generated SignedSource<<0825fc2358737646308f0e2f30f88d3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedFragment">;
  readonly " $fragmentType": "CinematicPublicPostFragment";
};
export type CinematicPublicPostFragment$key = {
  readonly " $data"?: CinematicPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CinematicPublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "5071f7acbd5a42a4c78110907dd5cf7c";

export default node;
