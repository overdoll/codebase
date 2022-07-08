/**
 * @generated SignedSource<<66974bd78c3cff5da0dc3453f3ba54e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VideoSnippetFragment$data = {
  readonly height: number;
  readonly preview: string;
  readonly videoThumbnail: {
    readonly url: string;
  } | null;
  readonly width: number;
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

(node as any).hash = "1d22d6cb8adac75174a84cdacfe3abd9";

export default node;
