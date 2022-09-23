/**
 * @generated SignedSource<<ec3b63576d0d314cec13fa802731989f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ContainerCreatePostFragment$data = {
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"BannerCreatePostFragment" | "UpdateCreatePostFragment">;
  readonly " $fragmentType": "ContainerCreatePostFragment";
};
export type ContainerCreatePostFragment$key = {
  readonly " $data"?: ContainerCreatePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerCreatePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerCreatePostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerCreatePostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateCreatePostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "fe806f2058c2405002f63ab689a7da6c";

export default node;
