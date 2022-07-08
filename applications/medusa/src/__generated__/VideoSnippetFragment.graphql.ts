/**
 * @generated SignedSource<<d794e2cf327c96f2c34e58779b982283>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VideoSnippetFragment$data = {
  readonly preview: string;
  readonly videoThumbnail: {
    readonly url: string;
  } | null;
  readonly " $fragmentType": "VideoSnippetFragment";
};
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
      "name": "preview",
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "1be50f672b3eefbbe06b7bb0cee3278c";

export default node;
