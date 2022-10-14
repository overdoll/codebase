/**
 * @generated SignedSource<<6e9e839e131e57700f1ea2dc0aeb6492>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostFragment" | "CinematicPublicPostFragment" | "DescriptionPublicPostFragment" | "PrepareGridSuggestedPostsFragment">;
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
      "name": "PrepareGridSuggestedPostsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "747c928a2c9eb0e546ee136d01c9c89d";

export default node;
