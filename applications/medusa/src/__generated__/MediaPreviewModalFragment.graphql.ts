/**
 * @generated SignedSource<<e2e8c3e3b626819b39655282e3dc7bfb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaPreviewModalFragment$data = {
  readonly preview: string;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewMediaOldFragment">;
  readonly " $fragmentType": "MediaPreviewModalFragment";
};
export type MediaPreviewModalFragment$key = {
  readonly " $data"?: MediaPreviewModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaPreviewModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MediaPreviewModalFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preview",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewMediaOldFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "1a9554a8186b4b87861407306a573a2a";

export default node;
