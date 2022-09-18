/**
 * @generated SignedSource<<db038bbbf7ab19d2835891cc01b83f81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonFragment">;
  readonly " $fragmentType": "PreviewFooterFragment";
};
export type PreviewFooterFragment$key = {
  readonly " $data"?: PreviewFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewFooterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewFooterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "0f0385656386c041c14db7fbf5f90931";

export default node;
