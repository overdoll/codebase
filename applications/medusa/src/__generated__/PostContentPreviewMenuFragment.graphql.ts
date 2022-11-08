/**
 * @generated SignedSource<<f534ec18e51b25fbfb4a052a424a439d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArrangePostContentButtonsFragment" | "RemovePostContentButtonFragment">;
  readonly " $fragmentType": "PostContentPreviewMenuFragment";
};
export type PostContentPreviewMenuFragment$key = {
  readonly " $data"?: PostContentPreviewMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangePostContentButtonsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "115a2f194d2c831e72836b76b0837f97";

export default node;
