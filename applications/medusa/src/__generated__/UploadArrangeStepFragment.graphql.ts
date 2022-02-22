/**
 * @generated SignedSource<<848d17e71801f776d5fbd576c87ade00>>
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
      "concreteType": "PostContent",
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

(node as any).hash = "4dc3ce1cce2115209f9b6a3d0fb4845c";

export default node;
