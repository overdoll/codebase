/**
 * @generated SignedSource<<7d56483e65f09667f7c480f4c33d9829>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadArrangeStepFragment.graphql.ts
export type UploadArrangeStepFragment = {
    readonly content: ReadonlyArray<{
        readonly id: string;
        readonly urls: ReadonlyArray<{
            readonly url: string;
            readonly mimeType: string;
        }>;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"ArrangeUploadsFragment" | "ProcessUploadsFragment">;
    readonly " $refType": "UploadArrangeStepFragment";
};
export type UploadArrangeStepFragment$data = UploadArrangeStepFragment;
export type UploadArrangeStepFragment$key = {
    readonly " $data"?: UploadArrangeStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadArrangeStepFragment">;
=======
export type ArrangeFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly urls: ReadonlyArray<{
      readonly url: string;
      readonly mimeType: string;
    }>;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeUploadsFragment" | "ProcessUploadsFragment">;
  readonly " $fragmentType": "ArrangeFragment";
};
export type ArrangeFragment = ArrangeFragment$data;
export type ArrangeFragment$key = {
  readonly " $data"?: ArrangeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeFragment">;
>>>>>>> master:applications/medusa/src/__generated__/ArrangeFragment.graphql.ts
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
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadArrangeStepFragment.graphql.ts
(node as any).hash = 'c52a3e480ee0ab99ed3ab735ad53a5d5';
=======

(node as any).hash = "f7c9d2ccddaea75be9ba69d8d6b6363d";

>>>>>>> master:applications/medusa/src/__generated__/ArrangeFragment.graphql.ts
export default node;
