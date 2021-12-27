/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStateDraftPreviewFragment = {
    readonly reference: string;
    readonly content: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"useCheckRequirementsFragment">;
    readonly " $refType": "PostStateDraftPreviewFragment";
};
export type PostStateDraftPreviewFragment$data = PostStateDraftPreviewFragment;
export type PostStateDraftPreviewFragment$key = {
    readonly " $data"?: PostStateDraftPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStateDraftPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateDraftPreviewFragment",
  "selections": [
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCheckRequirementsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '3b5a5081a107abaaf972381cefa22278';
export default node;
