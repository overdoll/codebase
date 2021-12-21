/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ImageSnippetFragment = {
    readonly urls: ReadonlyArray<{
        readonly url: unknown;
        readonly mimeType: string;
    }>;
    readonly " $refType": "ImageSnippetFragment";
};
export type ImageSnippetFragment$data = ImageSnippetFragment;
export type ImageSnippetFragment$key = {
    readonly " $data"?: ImageSnippetFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ImageSnippetFragment">;
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
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
(node as any).hash = 'e7dbf073efc0cda0452cf0c16cd93f37';
export default node;
