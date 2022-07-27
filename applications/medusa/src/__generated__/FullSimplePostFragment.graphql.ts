/**
 * @generated SignedSource<<8232377197e8aa5856147db233a9d3ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionFragment" | "PostFooterButtonsFragment" | "PostGalleryPublicSimpleFragment" | "PostHeaderFragment">;
  readonly " $fragmentType": "FullSimplePostFragment";
};
export type FullSimplePostFragment$key = {
  readonly " $data"?: FullSimplePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicSimpleFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDescriptionFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c2991fb8b4cff6187bbf8ba844cc8961";

export default node;
