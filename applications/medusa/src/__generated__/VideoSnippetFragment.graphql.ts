/**
 * @generated SignedSource<<9e2da4294280dac0ab10dddeab15dc96>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VideoSnippetFragment$data = {
  readonly videoThumbnail: {
    readonly url: string;
  } | null;
  readonly " $fragmentType": "VideoSnippetFragment";
};
export type VideoSnippetFragment = VideoSnippetFragment$data;
export type VideoSnippetFragment$key = {
  readonly " $data"?: VideoSnippetFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"VideoSnippetFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VideoSnippetFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "videoThumbnail",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "44910205c617e3743c77026ad205f34e";

export default node;
