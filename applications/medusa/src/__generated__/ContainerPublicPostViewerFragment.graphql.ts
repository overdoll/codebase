/**
 * @generated SignedSource<<ef21a60edf84e3928a97f19ad685bc88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostViewerFragment" | "CinematicPublicPostViewerFragment" | "DescriptionPublicPostViewerFragment" | "SuggestedPublicPostViewerFragment">;
  readonly " $fragmentType": "ContainerPublicPostViewerFragment";
};
export type ContainerPublicPostViewerFragment$key = {
  readonly " $data"?: ContainerPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicPostViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicPublicPostViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DescriptionPublicPostViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuggestedPublicPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "0edb0b3430f9d17551556be63006e975";

export default node;
