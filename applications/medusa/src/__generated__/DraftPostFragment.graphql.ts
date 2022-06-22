/**
 * @generated SignedSource<<05c51e219b78b1403e52b4ab83cf6598>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DraftPostFragment$data = {
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostDeleteButtonFragment" | "PostModerateButtonFragment" | "PostPreviewContentFragment">;
  readonly " $fragmentType": "DraftPostFragment";
};
export type DraftPostFragment$key = {
  readonly " $data"?: DraftPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DraftPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DraftPostFragment",
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
      "name": "PostModerateButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDeleteButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "6d6ed3f7cd8bf3638247d958febc3dd8";

export default node;
