/**
 * @generated SignedSource<<ac07ba784385c198d8534e0e9211b82f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostFragment" | "CinematicPublicPostFragment" | "DescriptionPublicPostFragment" | "PrepareSuggestedPostsFragment">;
  readonly " $fragmentType": "ContainerPublicPostFragment";
};
export type ContainerPublicPostFragment$key = {
  readonly " $data"?: ContainerPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DescriptionPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrepareSuggestedPostsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "8b5ffde0a803293daf424b9e9ac253f3";

export default node;
