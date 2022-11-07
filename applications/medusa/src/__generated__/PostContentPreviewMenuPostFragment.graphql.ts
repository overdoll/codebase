/**
 * @generated SignedSource<<bc7e984454b6dbbdf9483eb8582b4c4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewMenuPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArrangePostContentButtonsPostFragment" | "RemovePostContentButtonPostFragment">;
  readonly " $fragmentType": "PostContentPreviewMenuPostFragment";
};
export type PostContentPreviewMenuPostFragment$key = {
  readonly " $data"?: PostContentPreviewMenuPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMenuPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewMenuPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangePostContentButtonsPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c32672f90c8f331a84a774e6f95807fd";

export default node;
