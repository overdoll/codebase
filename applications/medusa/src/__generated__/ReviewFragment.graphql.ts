/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewFragment = {
    readonly id: string;
    readonly content: ReadonlyArray<{
        readonly urls: ReadonlyArray<{
            readonly url: string;
            readonly mimeType: string;
        }>;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryContentFragment" | "PostHeaderClubFragment">;
    readonly " $refType": "ReviewFragment";
};
export type ReviewFragment$data = ReviewFragment;
export type ReviewFragment$key = {
    readonly " $data"?: ReviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ReviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
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
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'b6436c46e0bd9aaa7d234e4d2578195f';
export default node;
