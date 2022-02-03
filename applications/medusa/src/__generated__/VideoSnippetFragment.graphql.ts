/**
 * @generated SignedSource<<efcd3faa0840acd2a5cb8154ff5cfe12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VideoSnippetFragment$data = {
  readonly urls: ReadonlyArray<{
    readonly url: string;
    readonly mimeType: string;
  }>;
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
      "name": "urls",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "f06fc0d78c395c187860ec35dbc60445";

export default node;
