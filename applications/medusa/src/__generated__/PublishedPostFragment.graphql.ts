/**
 * @generated SignedSource<<2db7cdc0121ba06e41ddf21c82f24c3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublishedPostFragment$data = {
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostCopyLinkButtonFragment" | "PostModerateButtonFragment">;
  readonly " $fragmentType": "PublishedPostFragment";
};
export type PublishedPostFragment = PublishedPostFragment$data;
export type PublishedPostFragment$key = {
  readonly " $data"?: PublishedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublishedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublishedPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostModerateButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "f7d874f615f0409084fd49a059c31e83";

export default node;
