/**
 * @generated SignedSource<<f95e5a3a571b154329d44b0d56d3a26d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostFragment" | "CinematicPublicPostFragment" | "DescriptionPublicPostFragment" | "SuggestedPublicPostFragment">;
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
      "name": "SuggestedPublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ff9323b9b342b355f2e2058ef13248c1";

export default node;
