/**
 * @generated SignedSource<<c403ebc050a8745fcc4a273f9768ab9b>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostModerateButtonFragment" | "PostDeleteButtonFragment">;
  readonly " $fragmentType": "DraftPostFragment";
};
export type DraftPostFragment = DraftPostFragment$data;
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
