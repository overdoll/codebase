/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStateReviewPreviewFragment = {
    readonly id: string;
    readonly reference: string;
    readonly postedAt: unknown | null;
    readonly content: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    }>;
    readonly " $refType": "PostStateReviewPreviewFragment";
};
export type PostStateReviewPreviewFragment$data = PostStateReviewPreviewFragment;
export type PostStateReviewPreviewFragment$key = {
    readonly " $data"?: PostStateReviewPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStateReviewPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateReviewPreviewFragment",
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
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "postedAt",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'fc26b2ca8f035faec0b55fb89360284e';
export default node;
