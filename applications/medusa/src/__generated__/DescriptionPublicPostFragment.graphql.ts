/**
 * @generated SignedSource<<55d1523af035fcf9fbbcfe08f50f7d86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostFragment" | "MenuPublicPostFragment" | "RepostPublicPostFragment" | "SavePublicPostFragment" | "TagsPublicPostFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MenuPublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c68e3b22a31f7047a3be00b73d585291";

export default node;
