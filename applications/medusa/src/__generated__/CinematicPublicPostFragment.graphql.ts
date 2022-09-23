/**
 * @generated SignedSource<<1893fd7dde8e39a70db73dfaf0f365e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CinematicContentFragment">;
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
      "name": "CinematicContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "78dede76df9cea282328dca6151fde99";

export default node;
