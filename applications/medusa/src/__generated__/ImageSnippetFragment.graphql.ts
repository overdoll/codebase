/**
 * @generated SignedSource<<e952a4cdd6f24b06ea4b3a4ad874c5b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImageSnippetFragment$data = {
  readonly height: number;
  readonly id: string;
  readonly preview: string;
  readonly urls: ReadonlyArray<{
    readonly url: string;
  }>;
  readonly width: number;
  readonly " $fragmentType": "ImageSnippetFragment";
};
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "8f4f28ea11488813016e1c498329df34";

export default node;
