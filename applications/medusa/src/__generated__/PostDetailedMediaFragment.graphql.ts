/**
 * @generated SignedSource<<3bbedfaae6610d74204cc84627a055b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostDetailedMediaFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "MediaPreviewModalFragment" | "PostVideoMediaFragment">;
  readonly " $fragmentType": "PostDetailedMediaFragment";
};
export type PostDetailedMediaFragment$key = {
  readonly " $data"?: PostDetailedMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostDetailedMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostDetailedMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageSnippetFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostVideoMediaFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MediaPreviewModalFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "d1c91aeb20f06120e9b0d170cfe3b319";

export default node;
