/**
<<<<<<< HEAD
 * @generated SignedSource<<0bd9c234e7a1dec08965d6902720cbee>>
=======
 * @generated SignedSource<<e47c7277f235eef9126c088f5c079f22>>
>>>>>>> master
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
<<<<<<< HEAD
    readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
=======
    readonly resource: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
    };
>>>>>>> master
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
<<<<<<< HEAD
          "kind": "FragmentSpread",
          "name": "ResourceInfoFragment"
=======
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceItemFragment"
            }
          ],
          "storageKey": null
>>>>>>> master
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

<<<<<<< HEAD
(node as any).hash = "7c891bb10319c3763b5de2cf35c5ab73";
=======
(node as any).hash = "8caa6778c522f66d8e48360a5bb511cc";
>>>>>>> master

export default node;
