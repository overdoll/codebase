/**
 * @generated SignedSource<<f69e32dc2b5f5b941e4471e0e16cd891>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PreviewMediaFragment">;
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
      "name": "PreviewMediaFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "58ce20244c59fe3ac38c7ff8dfe786d4";

export default node;
