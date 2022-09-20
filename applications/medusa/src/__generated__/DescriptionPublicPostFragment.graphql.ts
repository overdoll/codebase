/**
 * @generated SignedSource<<4b8e46a6113b61fc34b0b0c1c86fadd2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostFragment" | "RepostPublicPostFragment" | "SavePublicPostFragment" | "TagsPublicPostFragment">;
  readonly " $fragmentType": "DescriptionPublicPostFragment";
};
export type DescriptionPublicPostFragment$key = {
  readonly " $data"?: DescriptionPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DescriptionPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionPublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RepostPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavePublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TagsPublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ceff41b3249881a474a38022ec37d644";

export default node;
