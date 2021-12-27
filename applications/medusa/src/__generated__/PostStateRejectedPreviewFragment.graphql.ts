/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStateRejectedPreviewFragment = {
    readonly postedAt: unknown | null;
    readonly content: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    }>;
    readonly " $refType": "PostStateRejectedPreviewFragment";
};
export type PostStateRejectedPreviewFragment$data = PostStateRejectedPreviewFragment;
export type PostStateRejectedPreviewFragment$key = {
    readonly " $data"?: PostStateRejectedPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStateRejectedPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateRejectedPreviewFragment",
  "selections": [
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
(node as any).hash = '100a64c54b6e6b75c872eba7946d8ec0';
export default node;
