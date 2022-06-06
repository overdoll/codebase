/**
 * @generated SignedSource<<e26203b3339a98f0e5933465a1596ef9>>
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
    readonly mimeType: string;
  }>;
  readonly width: number;
  readonly height: number;
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

(node as any).hash = "ba17eb64c75bc1cd201dbf1d2ce159dd";

export default node;
