/**
 * @generated SignedSource<<cff132591bffe65395999c8d4a277ae6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImageSnippetFragment$data = {
  readonly urls: ReadonlyArray<{
    readonly url: string;
  }>;
  readonly width: number;
  readonly height: number;
  readonly preview: string;
  readonly " $fragmentType": "ImageSnippetFragment";
};
export type ImageSnippetFragment = ImageSnippetFragment$data;
export type ImageSnippetFragment$key = {
  readonly " $data"?: ImageSnippetFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImageSnippetFragment",
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

(node as any).hash = "d1f1201ccbc7b656c5f941efdcf037f9";

export default node;
