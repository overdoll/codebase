/**
 * @generated SignedSource<<a4f8e1430946d7545a0eb59da993c726>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostCopyLinkButtonFragment" | "PostModerateButtonFragment" | "PostArchiveButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostArchiveButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "e20af5fe263ca90649797e8dc2944bea";

export default node;
