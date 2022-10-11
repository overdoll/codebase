/**
 * @generated SignedSource<<1764e30ae7835c27d741c177fdff12f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerLikesViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPostsLikesFragment">;
  readonly " $fragmentType": "ContainerLikesViewerFragment";
};
export type ContainerLikesViewerFragment$key = {
  readonly " $data"?: ContainerLikesViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerLikesViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerLikesViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPostsLikesFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "6cd7d23b52835c45a316b5d148aea0aa";

export default node;
