/**
 * @generated SignedSource<<181dc4ee4f29b66cd3770b13ed240a32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly isSupporterOnly: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  }>;
  readonly " $fragmentType": "PostPreviewContentFragment";
};
export type PostPreviewContentFragment = PostPreviewContentFragment$data;
export type PostPreviewContentFragment$key = {
  readonly " $data"?: PostPreviewContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceInfoFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "7aff7043fa334ff47841a6e00a39bbe7";

export default node;
