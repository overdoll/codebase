/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VideoSnippetFragment = {
    readonly urls: ReadonlyArray<{
        readonly url: unknown;
        readonly mimeType: string;
    }>;
    readonly " $refType": "VideoSnippetFragment";
};
export type VideoSnippetFragment$data = VideoSnippetFragment;
export type VideoSnippetFragment$key = {
    readonly " $data"?: VideoSnippetFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"VideoSnippetFragment">;
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
(node as any).hash = 'f06fc0d78c395c187860ec35dbc60445';
export default node;
