/**
 * @generated SignedSource<<1500bafe39780ad0a43ea6590eb67ec8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArchivedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostModerateButtonFragment" | "PostUnArchiveButtonFragment">;
  readonly " $fragmentType": "ArchivedPostFragment";
};
export type ArchivedPostFragment = ArchivedPostFragment$data;
export type ArchivedPostFragment$key = {
  readonly " $data"?: ArchivedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArchivedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArchivedPostFragment",
  "selections": [
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
      "name": "PostUnArchiveButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "4f7b0079021dbd517deddcf696512255";

export default node;
