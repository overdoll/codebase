/**
 * @generated SignedSource<<a976dba6b3a85a9f2a1495120885721b>>
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
    readonly isSupporterOnly: boolean;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeUploadsFragment" | "ProcessUploadsFragment">;
  readonly " $fragmentType": "UploadArrangeStepFragment";
};
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
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

(node as any).hash = "8ecb29b31b0d53061044548664f6f41f";

export default node;
