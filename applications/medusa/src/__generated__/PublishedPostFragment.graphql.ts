/**
 * @generated SignedSource<<49784f3dec5669e3fe621715fbbd34e9>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostCopyLinkButtonFragment" | "PostModerateButtonFragment" | "PostReportButtonFragment">;
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
      "name": "PostReportButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "97501e8fed41dd7f807f94528d75e9cb";

export default node;
