/**
 * @generated SignedSource<<08a79b853c2ab68b0e5e38e33146078f>>
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
  readonly width: number;
  readonly height: number;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "0da109bc2ab706d858b84547293ca639";

export default node;
