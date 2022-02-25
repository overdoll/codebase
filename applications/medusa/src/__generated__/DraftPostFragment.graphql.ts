/**
 * @generated SignedSource<<e7a03f53f552606ff7cb4b9881a2aad1>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostMenuFragment">;
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
      "name": "PostMenuFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d028566df305581a627eb40b1533e508";

export default node;
