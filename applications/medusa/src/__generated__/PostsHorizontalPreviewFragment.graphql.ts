/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostsHorizontalPreviewFragment = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly reference: string;
            readonly " $fragmentRefs": FragmentRefs<"PostPreviewContentFragment">;
        };
    }>;
    readonly " $refType": "PostsHorizontalPreviewFragment";
};
export type PostsHorizontalPreviewFragment$data = PostsHorizontalPreviewFragment;
export type PostsHorizontalPreviewFragment$key = {
    readonly " $data"?: PostsHorizontalPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostsHorizontalPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsHorizontalPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Post",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reference",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostPreviewContentFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostConnection",
  "abstractKey": null
};
(node as any).hash = 'f8f5a403bedad5b435dcc3cfccbce02e';
export default node;
