/**
 * @generated SignedSource<<bdc83af99130e0770325b027e925046e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadArrangeStepFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly urls: ReadonlyArray<{
      readonly url: string;
      readonly mimeType: string;
    }>;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeUploadsFragment" | "ProcessUploadsFragment">;
  readonly " $fragmentType": "UploadArrangeStepFragment";
};
export type UploadArrangeStepFragment = UploadArrangeStepFragment$data;
export type UploadArrangeStepFragment$key = {
  readonly " $data"?: UploadArrangeStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadArrangeStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadArrangeStepFragment",
  "selections": [
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
      "name": "ArrangeUploadsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessUploadsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c52a3e480ee0ab99ed3ab735ad53a5d5";

export default node;
